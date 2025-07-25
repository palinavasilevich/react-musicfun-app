import { createFileRoute } from "@tanstack/react-router";
import { PlaylistPage } from "../../pages";

export const Route = createFileRoute("/my-playlists")({
  component: PlaylistPage,
});
