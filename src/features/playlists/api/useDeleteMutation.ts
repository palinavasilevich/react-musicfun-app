import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../../../shared/api/client";
import type { SchemaGetPlaylistsOutput } from "../../../shared/api/schema";

export const useDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (playlistId: string) => {
      const response = await client.DELETE("/playlists/{playlistId}", {
        params: {
          path: {
            playlistId,
          },
        },
      });

      return response.data;
    },
    onSuccess: (_, playlistId: string) => {
      queryClient.setQueriesData(
        { queryKey: ["playlists"] },
        (previousPlaylists: SchemaGetPlaylistsOutput) => {
          return {
            ...previousPlaylists,
            data: previousPlaylists.data.filter(
              (playlist) => playlist.id !== playlistId
            ),
          };
        }
      );
    },
  });
};
