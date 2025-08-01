import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button, Textarea, TextField } from "../../../../shared/components";
import cls from "./AddPlaylistForm.module.css";
import { client } from "../../../../shared/api/client";
import type { SchemaCreatePlaylistRequestPayload } from "../../../../shared/api/schema";

export const AddPlaylistForm = () => {
  const { register, handleSubmit } =
    useForm<SchemaCreatePlaylistRequestPayload>();

  const queryClient = useQueryClient();

  const { mutate: createNewPlaylist } = useMutation({
    mutationFn: async (data: SchemaCreatePlaylistRequestPayload) => {
      const response = await client.POST("/playlists", {
        body: data,
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

  const onSubmit = (data: SchemaCreatePlaylistRequestPayload) => {
    createNewPlaylist(data);
  };

  return (
    <form className={cls.addPlaylistForm} onSubmit={handleSubmit(onSubmit)}>
      <h2>Add New Playlist</h2>

      <TextField {...register("title")} />

      <Textarea {...register("description")} />
      <Button type="submit">Create New Playlist</Button>
    </form>
  );
};
