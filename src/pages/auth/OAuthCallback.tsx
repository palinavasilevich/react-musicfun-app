import { useEffect } from "react";

export const OAuthCallbackPage = () => {
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    if (code && window.opener) {
      window.opener.postMessage({ code }, window.location.origin);
    }

    window.close();
  }, []);

  return (
    <>
      <h1>OAuth Callback Page</h1>
    </>
  );
};
