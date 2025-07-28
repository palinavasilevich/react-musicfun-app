import { useState, type ChangeEvent } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { client } from "../../shared/api/client";
import { Pagination } from "../../shared/ui/pagination";

import cls from "./Playlists.module.css";

export const Playlists = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
  };

  const {
    data: playlists,
    isPending,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["playlists", { page, search: searchTerm }],
    queryFn: async ({ signal }) => {
      const response = await client.GET("/playlists", {
        params: {
          query: {
            pageNumber: page,
            search: searchTerm,
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
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Searching playlists..."
        />
      </div>
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
