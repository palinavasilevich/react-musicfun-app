import { MutationCache, QueryClient } from "@tanstack/react-query";
import { mutationGlobalErrorHandler } from "../../shared/api/query-error-handler-for-rhf-factory";

export type MutationMeta = {
  globalErrorHandler?: "on" | "off";
};

declare module "@tanstack/react-router" {
  interface Register {
    mutationMeta: MutationMeta;
  }
}

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: mutationGlobalErrorHandler,
  }),
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      gcTime: 5 * 1000,
    },
  },
});
