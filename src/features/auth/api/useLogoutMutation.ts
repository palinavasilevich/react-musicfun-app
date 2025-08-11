import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../../../shared/api/client";
import { localStorageKeys } from "../../../shared/config/localstorage-keys";
import { authKeys } from "../../../shared/api/keys-factories/auth-keys-factory";

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  const refreshToken = localStorage.getItem(localStorageKeys.refreshToken)!;

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await client.POST("/auth/logout", {
        body: {
          refreshToken,
        },
      });

      return response.data;
    },

    onSuccess: () => {
      localStorage.removeItem(localStorageKeys.accessToken);
      localStorage.removeItem(localStorageKeys.refreshToken);

      queryClient.resetQueries({
        queryKey: authKeys.me(),
      });
    },
  });

  return mutation;
};
