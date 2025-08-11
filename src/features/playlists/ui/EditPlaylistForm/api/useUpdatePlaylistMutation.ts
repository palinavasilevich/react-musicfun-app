import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../../../../../shared/api/client";
import { playlistsKeys } from "./../../../../../shared/api/keys-factories/playlists-keys-factory";

import type {
  SchemaGetPlaylistsOutput,
  SchemaUpdatePlaylistRequestPayload,
} from "../../../../../shared/api/schema";
import type { JsonApiErrorDocument } from "../../../../../shared/api/json-api-error";

type MutationVariables = SchemaUpdatePlaylistRequestPayload & {
  playlistId: string;
};

export const useUpdatePlaylistMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: JsonApiErrorDocument) => void;
}) => {
  const queryClient = useQueryClient();

  const queryKey = playlistsKeys.myList();

  return useMutation({
    mutationFn: async (variables: MutationVariables) => {
      const { playlistId, ...rest } = variables;
      const response = await client.PUT("/playlists/{playlistId}", {
        params: {
          path: {
            playlistId: playlistId,
          },
        },
        body: { ...rest, tagIds: [] },
      });

      return response.data;
    },

    onMutate: async (variables: MutationVariables) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: playlistsKeys.all });

      // Snapshot the previous value
      const previousCurrentUserPlaylists = queryClient.getQueryData(queryKey);

      // Optimistically update to the new value
      queryClient.setQueryData(
        queryKey,
        (previousPlaylists: SchemaGetPlaylistsOutput) => {
          return {
            ...previousPlaylists,
            data: previousPlaylists.data.map((playlist) => {
              if (playlist.id === variables.playlistId) {
                return {
                  ...playlist,
                  attributes: {
                    ...playlist.attributes,
                    title: variables.title,
                    description: variables.description,
                  },
                };
              } else {
                return playlist;
              }
            }),
          };
        }
      );

      // Return a context with the previous playlists
      return { previousCurrentUserPlaylists };
    },

    // If the mutation fails, use the context we returned above
    onError: (error, __: MutationVariables, context) => {
      queryClient.setQueryData(queryKey, context!.previousCurrentUserPlaylists);
      onError?.(error as unknown as JsonApiErrorDocument);
    },
    onSuccess: () => {
      onSuccess?.();
    },

    // Always refetch after error or success:
    onSettled: (_, __, variables: MutationVariables) => {
      queryClient.invalidateQueries({
        queryKey: playlistsKeys.lists(),
        refetchType: "all",
      });

      queryClient.invalidateQueries({
        queryKey: playlistsKeys.detail(variables.playlistId),
        refetchType: "all",
      });
    },
  });
};
