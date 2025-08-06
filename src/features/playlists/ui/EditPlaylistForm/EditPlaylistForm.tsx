import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Button, Textarea, TextField } from "../../../../shared/components";

import { client } from "../../../../shared/api/client";
import type { SchemaUpdatePlaylistRequestPayload } from "../../../../shared/api/schema";

import cls from "./EditPlaylistForm.module.css";
import { useEffect } from "react";

type Props = {
  playlistId: string | null;
};

export const EditPlaylistForm = ({ playlistId }: Props) => {
  const { register, handleSubmit, reset } =
    useForm<SchemaUpdatePlaylistRequestPayload>();

  useEffect(() => {
    reset();
  }, [playlistId, reset]);

  const {
    data: playlist,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["playlists", playlistId],
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlists"],
        refetchType: "all",
      });
    },
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
