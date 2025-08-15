import { useState, type ChangeEvent } from "react";
import { usePlaylistQuery } from "../../api/usePlaylistsQuery";
import {
  SearchField,
  Pagination,
  ContentList,
  Loader,
} from "../../../../shared/components";
import { PlaylistCard } from "../PlaylistCard";
import { useModalContext } from "../../../../app/context/ModalContext";
import cls from "./Playlists.module.css";

type Props = {
  userId?: string;
  isSearchActive?: boolean;
};

export const Playlists = ({ userId, isSearchActive }: Props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { openModal } = useModalContext();

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

  const openEditPlaylistModal = (playlistId: string) =>
    openModal("edit", playlistId);

  let content;

  if (isPending) {
    content = <Loader />;
  } else if (isError) {
    content = (
      <span>
        {error.message || "Playlist loading error. Please try again later."}
      </span>
    );
  } else if (playlists?.data.length === 0) {
    content = <span>No results found for your search.</span>;
  } else if (playlists?.data) {
    content = (
      <>
        {isSearchActive && (
          <SearchField
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search playlists"
          />
        )}
        <ContentList
          data={playlists.data}
          renderItem={(playlist) => (
            <PlaylistCard
              id={playlist.id}
              title={playlist.attributes.title}
              images={playlist.attributes.images}
              description={playlist.attributes.description}
              isShowActionButtons={playlist.attributes.user.id === userId}
              onEditPlaylist={openEditPlaylistModal}
            />
          )}
        />
        <Pagination
          pagesCount={playlists.meta.pagesCount || 1}
          currentPage={pageNumber}
          onChangePageNumber={setPageNumber}
          isFetching={isFetching}
          className={cls.pagination}
        />
      </>
    );
  }

  return <div className={cls.playlists}>{content}</div>;
};
