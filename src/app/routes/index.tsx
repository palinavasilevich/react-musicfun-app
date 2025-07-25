import { createFileRoute } from "@tanstack/react-router";
import { PlaylistsPage } from "../../pages";

export const Route = createFileRoute("/")({
  component: PlaylistsPage,
});
