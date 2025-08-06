import { useState, type ChangeEvent } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { client } from "../../../../shared/api/client";
import { Pagination } from "../../../../shared/ui/pagination";
import { SearchField } from "../../../../shared/components";
import { DeletePlaylistButton } from "../DeletePlaylistButton";

import cls from "./Playlists.module.css";

type Props = {
  userId?: string;
  onSelectPlaylist?: (playlistId: string) => void;
};

export const Playlists = ({ userId, onSelectPlaylist }: Props) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
  };

  const handleSelectPlaylist = (playlistId: string) => {
    onSelectPlaylist?.(playlistId);
  };

  const {
    data: playlists,
    isPending,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["playlists", { page, search: searchTerm, userId }],
    queryFn: async ({ signal }) => {
      const response = await client.GET("/playlists", {
        params: {
          query: {
            pageNumber: page,
            search: searchTerm,
            userId,
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
      <SearchField
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search playlists"
      />

      <ul className={cls.list}>
        {playlists.data.map((playlist) => (
          <li
            key={playlist.id}
            className={cls.playlist}
            onClick={() => handleSelectPlaylist(playlist.id)}
          >
            {playlist.attributes.title}
            {playlist.attributes.user.id === userId && (
              <DeletePlaylistButton playlistId={playlist.id} />
            )}
          </li>
        ))}
      </ul>

      <Pagination
        pagesCount={playlists.meta.pagesCount}
        currentPage={page}
        onChangePageNumber={setPage}
        isFetching={isFetching}
      />
    </div>
  );
};
