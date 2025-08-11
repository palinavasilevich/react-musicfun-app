import { Button } from "../../../../shared/components";
import { apiBaseUrl } from "../../../../shared/config/api-config";
import { ProfileIcon } from "../../../../shared/icons";
import { callbackUrl, useLoginMutation } from "../../api/useLoginMutation";

export const LoginButton = () => {
  const { mutate: login } = useLoginMutation();

  const handleLoginClick = () => {
    window.addEventListener("message", handleOauthMessage);

    window.open(
      `${apiBaseUrl}/auth/oauth-redirect?callbackUrl=${callbackUrl}`,
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

    login({ code });
  };

  return (
    <Button
      as="button"
      target="_blank"
      variant="primary"
      fullWidth
      onClick={handleLoginClick}
    >
      <ProfileIcon />
      Sign in with APIHub
    </Button>
  );
};
