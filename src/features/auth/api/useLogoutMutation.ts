import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../../../shared/api/client";

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  const refreshToken = localStorage.getItem("musicfun-refresh-token")!;

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
      localStorage.removeItem("musicfun-refresh-token");
      localStorage.removeItem("musicfun-access-token");

      queryClient.resetQueries({
        queryKey: ["auth", "me"],
      });
    },
  });

  return mutation;
};
