import { client } from "./shared/api/client";
import { useQuery } from "@tanstack/react-query";

function App() {
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
          <li>{playlist.attributes.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
