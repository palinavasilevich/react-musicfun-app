import { Button } from "../../../../shared/components";
import { useDeleteMutation } from "../../api/useDeleteMutation";

type Props = {
  playlistId: string;
};

export const DeletePlaylistButton = ({ playlistId }: Props) => {
  const { mutate: deletePlaylist, isPending } = useDeleteMutation();

  const handleDeletePlaylist = () => {
    deletePlaylist(playlistId);
  };

  return (
    <Button onClick={handleDeletePlaylist} disabled={isPending}>
      🗑
    </Button>
  );
};
