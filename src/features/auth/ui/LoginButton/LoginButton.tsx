import { useMutation } from "@tanstack/react-query";
import { client } from "../../../../shared/api/client";
import { Button } from "../../../../shared/components";

export const LoginButton = () => {
  const callbackUrl = "http://localhost:5173/oauth/callback";

  const { mutate } = useMutation({
    mutationFn: async ({ code }: { code: string }) => {
      const response = await client.POST("/auth/login", {
        body: {
          code,
          redirectUri: callbackUrl,
          rememberMe: true,
          accessTokenTTL: "1d",
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data;
    },

    onSuccess: ({ refreshToken, accessToken }) => {
      localStorage.setItem("musicfun-refresh-token", refreshToken);
      localStorage.setItem("musicfun-access-token", accessToken);
    },
  });

  const handleLoginClick = () => {
    window.addEventListener("message", handleOauthMessage);

    window.open(
      `https://musicfun.it-incubator.app/api/1.0/auth/oauth-redirect?callbackUrl=${callbackUrl}`,
      "apihub-oauth2",
      "width=500, height=500"
    );
  };

  const handleOauthMessage = (event: MessageEvent) => {
    window.removeEventListener("message", handleOauthMessage);

    if (event.origin !== document.location.origin) {
      console.warn("origin mot match");
      return;
    }

    const code = event.data.code;

    if (!code) {
      console.warn("no code in message");
      return;
    }

    mutate({ code });
  };

  return (
    <Button
      as="button"
      target="_blank"
      variant="primary"
      fullWidth
      onClick={handleLoginClick}
    >
      Sign in with APIHub
    </Button>
  );
};
