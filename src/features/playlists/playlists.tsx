import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { client } from "../../shared/api/client";
import { Pagination } from "../../shared/ui/pagination";

import cls from "./Playlists.module.css";

export const Playlists = () => {
  const [page, setPage] = useState(1);

  const {
    data: playlists,
    isPending,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["playlists", page],
    queryFn: async ({ signal }) => {
      const response = await client.GET("/playlists", {
        params: {
          query: {
            pageNumber: page,
          },
        },
        signal,
      });

      if (response.error) {
        throw (response as unknown as { error: Error }).error;
      }

      return response.data!;
    },
    placeholderData: keepPreviousData,
  });

  if (isPending) return <span>Loading...</span>;

  if (isError) return <span>{error.message}</span>;

  return (
    <div className={cls.playlists}>
      <div className={cls.paginationContainer}>
        <Pagination
          pagesCount={playlists.meta.pagesCount}
          currentPage={page}
          onChangePageNumber={setPage}
          isFetching={isFetching}
        />
      </div>
      <ul>
        {playlists.data.map((playlist) => (
          <li key={playlist.id}>{playlist.attributes.title}</li>
        ))}
      </ul>
    </div>
  );
};
