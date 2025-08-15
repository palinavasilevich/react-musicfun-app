import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "../tanstack-router/router-instance";

import "../../styles/fonts.css";
import "../../styles/variables.css";
import "../../styles/reset.css";
import "../../styles/global.css";
import ProviderWrapper from "./ProviderWrapper";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProviderWrapper>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </ProviderWrapper>
  </StrictMode>
);
