import { createFileRoute } from "@tanstack/react-router";
import { MyPlaylistsPage } from "../../pages";

export const Route = createFileRoute("/my-playlists")({
  component: MyPlaylistsPage,
});
