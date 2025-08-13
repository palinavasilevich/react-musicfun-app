import { useState } from "react";
import { Navigate } from "@tanstack/react-router";

import { useMeQuery } from "../../features/auth/api/useMeQuery";
import { Playlists } from "../../features/playlists/ui/Playlists";
import { AddPlaylistForm, EditPlaylistForm } from "../../features/playlists/ui";
import { Button, Typography } from "../../shared/components";

import cls from "./MyPlaylistsPage.module.css";

export const MyPlaylistsPage = () => {
  const { data, isPending, isError } = useMeQuery();
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

  let content;

  if (isPending) {
    content = <span>Loading...</span>;
  }

  if (isError) {
    content = <span>Playlist loading error. Please try again later.</span>;
  }

  if (!data) {
    return <Navigate to="/" replace />;
  }

  if (data) {
    content = (
      <>
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
  }

  return (
    <>
      <Typography variant="h2" as="h1" className={cls.title}>
        My Playlists
      </Typography>
      {content}
    </>
  );
};
