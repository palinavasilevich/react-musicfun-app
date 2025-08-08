import { useState, type ChangeEvent } from "react";

import { SearchField, Pagination } from "../../../../shared/components";
import { DeletePlaylistButton } from "../DeletePlaylistButton";

import { usePlaylistQuery } from "../../api/usePlaylistsQuery";

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
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: playlists,
    isPending,
    isFetching,
    isError,
    error,
  } = usePlaylistQuery(userId, { search: searchTerm, pageNumber });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
  };

  const handleSelectPlaylist = (playlistId: string) => {
    onSelectPlaylist?.(playlistId);
  };

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
        currentPage={pageNumber}
        onChangePageNumber={setPageNumber}
        isFetching={isFetching}
      />
    </div>
  );
};
