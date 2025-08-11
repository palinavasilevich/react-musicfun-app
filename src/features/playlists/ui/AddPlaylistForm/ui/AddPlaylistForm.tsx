import { useForm } from "react-hook-form";

import {
  Button,
  Modal,
  Textarea,
  TextField,
} from "../../../../../shared/components";
import { useAddPlaylistMutation } from "../api/useAddPlaylistMutation";

import type { SchemaCreatePlaylistRequestPayload } from "../../../../../shared/api/schema";

import { type JsonApiErrorDocument } from "../../../../../shared/api/json-api-error";
import { queryErrorHandlerForRHFFactory } from "../../../../../shared/api/query-error-handler-for-rhf-factory";

import cls from "./AddPlaylistForm.module.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddPlaylistForm = ({ isOpen, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<SchemaCreatePlaylistRequestPayload>();

  const { mutateAsync: createNewPlaylist, isPending } =
    useAddPlaylistMutation();

  const onSubmit = async (data: SchemaCreatePlaylistRequestPayload) => {
    try {
      await createNewPlaylist(data);

      reset();
      onClose();
    } catch (error) {
      queryErrorHandlerForRHFFactory({ setError })(
        error as unknown as JsonApiErrorDocument
      );
    }
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <form className={cls.addPlaylistForm} onSubmit={handleSubmit(onSubmit)}>
        <h2>Add New Playlist</h2>
        {errors.title && <p>{errors.title.message}</p>}
        <TextField
          {...register("title")}
          errorMessage={errors.title && errors.title.message}
          className={cls.input}
        />
        <Textarea
          {...register("description")}
          errorMessage={errors.description && errors.description.message}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Create New Playlist"}
        </Button>
        {errors.root?.server && <p>{errors.root?.server.message}</p>}
      </form>
    </Modal>
  );
};
