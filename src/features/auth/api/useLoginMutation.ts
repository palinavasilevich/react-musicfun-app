import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../../../shared/api/client";
import { localStorageKeys } from "../../../shared/config/localstorage-keys";
import { currentDomain } from "../../../shared/config/api-config";

export const callbackUrl = `${currentDomain}/oauth/callback`;

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
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
      localStorage.setItem(localStorageKeys.accessToken, refreshToken);
      localStorage.setItem(localStorageKeys.refreshToken, accessToken);

      queryClient.invalidateQueries({
        queryKey: ["auth", "me"],
      });
    },
  });

  return mutation;
};
