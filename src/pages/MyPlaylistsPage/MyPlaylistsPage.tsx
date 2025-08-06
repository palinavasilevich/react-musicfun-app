import { Navigate } from "@tanstack/react-router";
import { useMeQuery } from "../../features/auth/api/useMeQuery";
import { Playlists } from "../../features/playlists/ui/Playlists";
import { AddPlaylistForm, EditPlaylistForm } from "../../features/playlists/ui";
import { useState } from "react";

export const MyPlaylistsPage = () => {
  const { data, isPending } = useMeQuery();
  const [editingPlaylistId, setEditingPlaylistId] = useState<string | null>(
    null
  );

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (!data) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <h1>My Playlists</h1>
      <AddPlaylistForm />
      <Playlists userId={data.userId} onSelectPlaylist={setEditingPlaylistId} />
      <EditPlaylistForm playlistId={editingPlaylistId} />
    </>
  );
};
