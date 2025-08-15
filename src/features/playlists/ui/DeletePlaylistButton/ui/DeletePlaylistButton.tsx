import clsx from "clsx";
import { Button, SmallLoader } from "../../../../../shared/components";
import { DeleteIcon } from "../../../../../shared/icons";
import { useDeleteMutation } from "../api/useDeleteMutation";

import cls from "./DeletePlaylistButton.module.css";

type Props = {
  playlistId: string;
  className?: string;
};

export const DeletePlaylistButton = ({ playlistId, className }: Props) => {
  const { mutate: deletePlaylist, isPending } = useDeleteMutation();

  const handleDeletePlaylist = () => {
    deletePlaylist(playlistId);
  };

  return (
    <Button
      onClick={handleDeletePlaylist}
      disabled={isPending}
      variant="withIcon"
      className={clsx(cls.btn, className)}
    >
      {!isPending ? <DeleteIcon /> : <SmallLoader />}
    </Button>
  );
};
