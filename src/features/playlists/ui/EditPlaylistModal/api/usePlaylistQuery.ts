import { useQuery } from "@tanstack/react-query";
import { client } from "../../../../../shared/api/client";

export const usePlaylistQuery = (playlistId: string | null) =>
  useQuery({
    queryKey: ["playlists", "details", playlistId],
    queryFn: async () => {
      const response = await client.GET("/playlists/{playlistId}", {
        params: {
          path: {
            playlistId: playlistId!,
          },
        },
      });

      return response.data!;
    },
    enabled: !!playlistId,
  });
