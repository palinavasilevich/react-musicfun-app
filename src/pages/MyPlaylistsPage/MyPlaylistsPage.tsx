import { Navigate } from "@tanstack/react-router";
import { useMeQuery } from "../../features/auth/api/useMeQuery";
import { Playlists } from "../../features/playlists/ui/Playlists";
import { AddPlaylistForm } from "../../features/playlists/ui";

export const MyPlaylistsPage = () => {
  const { data, isPending } = useMeQuery();

  if (isPending) {
    <span>Loading...</span>;
  }

  if (!data) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <h1>My Playlists</h1>
      <AddPlaylistForm />
      <Playlists userId={data.userId} />
    </>
  );
};
