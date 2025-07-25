import { client } from "../../shared/api/client";
import { useQuery } from "@tanstack/react-query";

import cls from "./playlists.module.css";

export const Playlists = () => {
  const fetchPlaylists = () => client.GET("/playlists");

  const { data: playlists } = useQuery({
    queryKey: ["playlists"],
    queryFn: fetchPlaylists,
  });

  return (
    <div className={cls.playlists}>
      <ul>
        {playlists?.data?.data.map((playlist) => (
          <li key={playlist.id}>{playlist.attributes.title}</li>
        ))}
      </ul>
    </div>
  );
};
