import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { client } from "../../../shared/api/client";
import { playlistsKeys } from "../../../shared/api/keys-factories/playlists-keys-factory";

import type { SchemaGetPlaylistsRequestPayload } from "../../../shared/api/schema";

export const usePlaylistQuery = (
  userId: string | undefined,
  filters: Partial<SchemaGetPlaylistsRequestPayload>
) => {
  const queryKey = userId
    ? playlistsKeys.myList()
    : playlistsKeys.list({
        pageNumber: filters.pageNumber,
        search: filters.search,
      });

  const queryParams = userId ? { userId } : filters;

  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: queryKey,
    queryFn: async ({ signal }) => {
      const response = await client.GET("/playlists", {
        params: {
          query: queryParams,
        },
        signal,
      });

      if (response.error) {
        throw (response as unknown as { error: Error }).error;
      }

      return response.data!;
    },
    placeholderData: keepPreviousData,
  });
};
