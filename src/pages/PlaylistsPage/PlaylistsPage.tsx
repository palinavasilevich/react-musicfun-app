import { Playlists } from "../../features/playlists/ui/Playlists";
import { Typography } from "../../shared/components";

export const PlaylistsPage = () => {
  return (
    <>
      <Typography variant="h2" as="h1">
        Playlists
      </Typography>
      <Playlists isSearchActive />
    </>
  );
};
