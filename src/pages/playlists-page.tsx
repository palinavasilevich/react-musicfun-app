import { client } from "../shared/api/client";
import { useQuery } from "@tanstack/react-query";

export const PlaylistsPage = () => {
  const fetchPlaylists = () => client.GET("/playlists");

  const { data: playlists } = useQuery({
    queryKey: ["playlists"],
    queryFn: fetchPlaylists,
  });

  return (
    <>
      <h1>HELLO</h1>
      <ul>
        {playlists?.data?.data.map((playlist) => (
          <li key={playlist.id}>{playlist.attributes.title}</li>
        ))}
      </ul>
    </>
  );
};
