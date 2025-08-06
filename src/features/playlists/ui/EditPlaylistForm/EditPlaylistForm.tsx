import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Button, Textarea, TextField } from "../../../../shared/components";

import { client } from "../../../../shared/api/client";
import type {
  SchemaGetPlaylistsOutput,
  SchemaUpdatePlaylistRequestPayload,
} from "../../../../shared/api/schema";

import cls from "./EditPlaylistForm.module.css";
import { useEffect } from "react";
import { useMeQuery } from "../../../auth/api/useMeQuery";

type Props = {
  playlistId: string | null;
};

export const EditPlaylistForm = ({ playlistId }: Props) => {
  const { register, handleSubmit, reset } =
    useForm<SchemaUpdatePlaylistRequestPayload>();

  const { data: userData } = useMeQuery();

  useEffect(() => {
    reset();
  }, [playlistId, reset]);

  const {
    data: playlist,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["playlists", "details", playlistId],
    queryFn: async () => {
      const response = await client.GET("/playlists/{playlistId}", {
        params: {
          path: {
            playlistId: playlistId!,
          },
        },
      });

      return response.data!;
    },
    enabled: !!playlistId,
  });

  const queryClient = useQueryClient();

  const queryKey = ["playlists", "my", userData!.userId];

  const { mutate: editPlaylist } = useMutation({
    mutationFn: async (data: SchemaUpdatePlaylistRequestPayload) => {
      const response = await client.PUT("/playlists/{playlistId}", {
        params: {
          path: {
            playlistId: playlistId!,
          },
        },
        body: { ...data, tagIds: [] },
      });

      return response.data;
    },

    onMutate: async (editedPlaylist: SchemaUpdatePlaylistRequestPayload) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["playlists"] });

      // Snapshot the previous value
      const previousCurrentUserPlaylists = queryClient.getQueryData(queryKey);

      // Optimistically update to the new value
      queryClient.setQueryData(
        queryKey,
        (previousPlaylists: SchemaGetPlaylistsOutput) => {
          return {
            ...previousPlaylists,
            data: previousPlaylists.data.map((playlist) => {
              if (playlist.id === playlistId) {
                return {
                  ...playlist,
                  attributes: {
                    ...playlist.attributes,
                    title: editedPlaylist.title,
                    description: editedPlaylist.description,
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
    onError: (_, __: SchemaUpdatePlaylistRequestPayload, context) => {
      queryClient.setQueryData(queryKey, context?.previousCurrentUserPlaylists);
    },

    // Always refetch after error or success:
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["playlists"],
        refetchType: "all",
      }),
  });

  const onSubmit = (data: SchemaUpdatePlaylistRequestPayload) => {
    editPlaylist(data);
  };

  if (!playlistId) return <></>;

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{error.message}</span>;
  }

  return (
    <form className={cls.editPlaylistForm} onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit Playlist</h2>

      <TextField
        {...register("title")}
        defaultValue={playlist.data.attributes.title}
      />

      <Textarea
        {...register("description")}
        defaultValue={playlist.data.attributes.description ?? ""}
      />
      <Button type="submit">Edit Playlist</Button>
    </form>
  );
};
