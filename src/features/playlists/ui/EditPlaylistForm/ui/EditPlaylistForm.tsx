import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button, Textarea, TextField } from "../../../../../shared/components";
import { usePlaylistQuery } from "../api/usePlaylistQuery";
import { useUpdatePlaylistMutation } from "../api/useUpdatePlaylistMutation";

import type { SchemaUpdatePlaylistRequestPayload } from "../../../../../shared/api/schema";
import cls from "./EditPlaylistForm.module.css";
import { queryErrorHandlerForRHFFactory } from "../../../../../shared/api/query-error-handler-for-rhf-factory";

type Props = {
  playlistId: string | null;
  onCancelEditing: () => void;
};

export const EditPlaylistForm = ({ playlistId, onCancelEditing }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<SchemaUpdatePlaylistRequestPayload>();

  useEffect(() => {
    reset();
  }, [playlistId, reset]);

  const {
    data: playlist,
    isPending,
    isError,
    error,
  } = usePlaylistQuery(playlistId);

  const { mutate: editPlaylist } = useUpdatePlaylistMutation({
    onSuccess: () => onCancelEditing(),
    onError: queryErrorHandlerForRHFFactory({ setError }),
  });

  const onSubmit = (data: SchemaUpdatePlaylistRequestPayload) => {
    editPlaylist({ ...data, playlistId: playlistId! });
  };

  const handleCancelEditingClick = () => {
    onCancelEditing();
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
        errorMessage={errors.title && errors.title.message}
      />

      <Textarea
        {...register("description")}
        defaultValue={playlist.data.attributes.description ?? ""}
        errorMessage={errors.description && errors.description.message}
      />
      <div>
        <Button type="submit">Save</Button>
        <Button type="reset" onClick={handleCancelEditingClick}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
