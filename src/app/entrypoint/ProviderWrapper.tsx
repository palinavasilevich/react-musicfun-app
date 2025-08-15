import { QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "../context/ModalContext";
import { queryClient } from "../tanstack-query/query-client-instance";

export default function ProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>{children}</ModalProvider>
    </QueryClientProvider>
  );
}
