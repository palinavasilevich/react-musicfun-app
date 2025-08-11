import { Button } from "../../../../../shared/components";
import { useDeleteMutation } from "../api/useDeleteMutation";

type Props = {
  playlistId: string;
  onDeleted: (playlistId: string) => void;
};

export const DeletePlaylistButton = ({ playlistId, onDeleted }: Props) => {
  const { mutate: deletePlaylist, isPending } = useDeleteMutation();

  const handleDeletePlaylist = () => {
    deletePlaylist(playlistId);
    onDeleted(playlistId);
  };

  return (
    <Button onClick={handleDeletePlaylist} disabled={isPending}>
      🗑
    </Button>
  );
};
