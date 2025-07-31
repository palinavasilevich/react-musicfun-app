import { Navigate } from "@tanstack/react-router";
import { useMeQuery } from "../../features/auth/api/useMeQuery";
import { Playlists } from "../../features/playlists";

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
      <Playlists userId={data.userId} />
    </>
  );
};
