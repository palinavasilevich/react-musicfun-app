import { useState, type ChangeEvent } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { client } from "../../../../shared/api/client";
import { Pagination } from "../../../../shared/ui/pagination";
import { SearchField } from "../../../../shared/components";
import { DeletePlaylistButton } from "../DeletePlaylistButton";

import cls from "./Playlists.module.css";

type Props = {
  userId?: string;
  isSearchActive?: boolean;
  onSelectPlaylist?: (playlistId: string) => void;
};

export const Playlists = ({
  userId,
  isSearchActive,
  onSelectPlaylist,
}: Props) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const queryKey = userId
    ? ["playlists", "my", userId]
    : ["playlists", { page, search: searchTerm }];

  const queryParams = userId
    ? { userId }
    : { pageNumber: page, search: searchTerm };

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
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: queryKey,
    queryFn: async ({ signal }) => {
      const response = await client.GET("/playlists", {
        params: {
          query: queryParams,
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
      {isSearchActive && (
        <SearchField
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search playlists"
        />
      )}

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
