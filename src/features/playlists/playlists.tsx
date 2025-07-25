import { useQuery } from "@tanstack/react-query";

import { client } from "../../shared/api/client";

import cls from "./Playlists.module.css";

export const Playlists = () => {
  const fetchPlaylists = async () => {
    const response = await client.GET("/playlists");

    if (response.error) {
      throw (response as unknown as { error: Error }).error;
    }

    return response.data!;
  };

  const {
    data: playlists,
    isPending,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["playlists"],
    queryFn: fetchPlaylists,
  });

  if (isPending) return <span>Loading...</span>;

  if (isError) return <span>{error.message}</span>;

  return (
    <div className={cls.playlists}>
      {isFetching ? "⏳" : ""}
      <ul>
        {playlists.data.map((playlist) => (
          <li key={playlist.id}>{playlist.attributes.title}</li>
        ))}
      </ul>
    </div>
  );
};
