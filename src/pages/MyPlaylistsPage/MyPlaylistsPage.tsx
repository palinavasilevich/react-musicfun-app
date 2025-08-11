import { useState } from "react";
import { Navigate } from "@tanstack/react-router";

import { useMeQuery } from "../../features/auth/api/useMeQuery";
import { Playlists } from "../../features/playlists/ui/Playlists";
import { AddPlaylistForm, EditPlaylistForm } from "../../features/playlists/ui";
import { Button } from "../../shared/components";

export const MyPlaylistsPage = () => {
  const { data, isPending } = useMeQuery();
  const [editingPlaylistId, setEditingPlaylistId] = useState<string | null>(
    null
  );

  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => setOpenModal(false);

  const handlePlaylistDelete = (playlistId: string) => {
    if (playlistId === editingPlaylistId) {
      setEditingPlaylistId(null);
    }
  };

  const handleCancelEditing = () => setEditingPlaylistId(null);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (!data) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <h1>My Playlists</h1>
      <Button onClick={() => setOpenModal(true)}>Add new playlist</Button>
      <AddPlaylistForm onClose={closeModal} isOpen={openModal} />
      <Playlists
        userId={data.userId}
        onSelectPlaylist={setEditingPlaylistId}
        onDeletePlaylist={handlePlaylistDelete}
      />
      <EditPlaylistForm
        playlistId={editingPlaylistId}
        onCancelEditing={handleCancelEditing}
      />
    </>
  );
};
