import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Modal,
  Textarea,
  TextField,
  Loader,
} from "../../../../../shared/components";
import { usePlaylistQuery } from "../api/usePlaylistQuery";
import { useUpdatePlaylistMutation } from "../api/useUpdatePlaylistMutation";
import type { SchemaUpdatePlaylistRequestPayload } from "../../../../../shared/api/schema";
import { queryErrorHandlerForRHFFactory } from "../../../../../shared/api/query-error-handler-for-rhf-factory";
import { useModalContext } from "../../../../../app/context/ModalContext";
import cls from "./EditPlaylistModal.module.css";

export const EditPlaylistModal = () => {
  const { currentModal, closeModal, editingPlaylistId } = useModalContext();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<SchemaUpdatePlaylistRequestPayload>();

  useEffect(() => {
    reset();
  }, [editingPlaylistId, reset]);

  const {
    data: playlist,
    isPending,
    isError,
    error,
  } = usePlaylistQuery(editingPlaylistId);

  const { mutate: editPlaylist } = useUpdatePlaylistMutation({
    onSuccess: () => closeModal(),
    onError: queryErrorHandlerForRHFFactory({ setError }),
  });

  const onSubmit = (data: SchemaUpdatePlaylistRequestPayload) => {
    editPlaylist({ ...data, playlistId: editingPlaylistId! });
  };

  const handleCancelEditingClick = () => closeModal();

  if (currentModal !== "edit") return null;

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return <span>{error.message}</span>;
  }

  return (
    <Modal isOpen={true} onClose={closeModal} title="Edit Playlist">
      <form className={cls.editPlaylistForm} onSubmit={handleSubmit(onSubmit)}>
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
        <div className={cls.actions}>
          <Button type="submit" fullWidth className={cls.btn}>
            Save
          </Button>
          <Button
            type="reset"
            fullWidth
            className={cls.btn}
            onClick={handleCancelEditingClick}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};
