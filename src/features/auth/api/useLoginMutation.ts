import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../../../shared/api/client";

export const callbackUrl = "http://localhost:5173/oauth/callback";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ code }: { code: string }) => {
      const response = await client.POST("/auth/login", {
        body: {
          code,
          redirectUri: callbackUrl,
          rememberMe: true,
          accessTokenTTL: "10s",
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

      queryClient.invalidateQueries({
        queryKey: ["auth", "me"],
      });
    },
  });

  return mutation;
};
