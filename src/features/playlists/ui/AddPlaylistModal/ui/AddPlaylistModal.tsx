import { useForm } from "react-hook-form";
import {
  Button,
  Modal,
  ModalFooter,
  SmallLoader,
  Textarea,
  TextField,
} from "../../../../../shared/components";
import { useAddPlaylistMutation } from "../api/useAddPlaylistMutation";
import type { SchemaCreatePlaylistRequestPayload } from "../../../../../shared/api/schema";
import { type JsonApiErrorDocument } from "../../../../../shared/api/json-api-error";
import { queryErrorHandlerForRHFFactory } from "../../../../../shared/api/query-error-handler-for-rhf-factory";
import { useModalContext } from "../../../../../app/context/ModalContext";
import cls from "./AddPlaylistModal.module.css";

export const AddPlaylistModal = () => {
  const { currentModal, closeModal } = useModalContext();

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
      closeModal();
    } catch (error) {
      queryErrorHandlerForRHFFactory({ setError })(
        error as unknown as JsonApiErrorDocument
      );
    }
  };

  if (currentModal !== "add") return null;

  return (
    <Modal isOpen={true} onClose={closeModal} title="Edit Playlist">
      <form className={cls.addPlaylistForm} onSubmit={handleSubmit(onSubmit)}>
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
        <ModalFooter>
          <Button type="submit" disabled={isPending}>
            {isPending ? <SmallLoader /> : "Create New Playlist"}
          </Button>
          {errors.root?.server && <p>{errors.root?.server.message}</p>}
        </ModalFooter>
      </form>
    </Modal>
  );
};
