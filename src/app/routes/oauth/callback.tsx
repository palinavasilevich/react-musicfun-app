import { createFileRoute } from "@tanstack/react-router";
import { OAuthCallbackPage } from "../../../pages/auth/OAuthCallback";

export const Route = createFileRoute("/oauth/callback")({
  component: OAuthCallbackPage,
});
