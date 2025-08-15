import { Navigate } from "@tanstack/react-router";
import { useMeQuery } from "../../features/auth/api/useMeQuery";
import { Playlists } from "../../features/playlists/ui/Playlists";
import {
  AddPlaylistModal,
  EditPlaylistModal,
} from "../../features/playlists/ui";
import { Button, Typography, Loader } from "../../shared/components";

import { useModalContext } from "../../app/context/ModalContext";

import cls from "./MyPlaylistsPage.module.css";

export const MyPlaylistsPage = () => {
  const { data, isPending } = useMeQuery();
  const { openModal } = useModalContext();

  const openAddNewPlaylistModal = () => openModal("add");

  let content;

  if (isPending) {
    content = <Loader />;
  }

  if (!data) {
    return <Navigate to="/" replace />;
  }

  if (data) {
    content = (
      <>
        <Button onClick={openAddNewPlaylistModal}>Add new playlist</Button>
        <Playlists userId={data.userId} />
        <AddPlaylistModal />
        <EditPlaylistModal />
      </>
    );
  }

  return (
    <>
      <Typography variant="h2" as="h1" className={cls.title}>
        My Playlists
      </Typography>
      {content}
    </>
  );
};
