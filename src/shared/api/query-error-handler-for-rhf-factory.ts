import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { toast } from "react-toastify";

import {
  isJsonApiErrorDocument,
  type JsonApiErrorDocument,
  parseJsonApiErrors,
} from "./json-api-error.ts";
import type { MutationMeta } from "../../app/entrypoint/main.tsx";

export const queryErrorHandlerForRHFFactory = <T extends FieldValues>({
  setError,
}: {
  setError?: UseFormSetError<T>;
}) => {
  return (err: JsonApiErrorDocument) => {
    // 400 from the server in JSON:API format
    if (isJsonApiErrorDocument(err)) {
      const { fieldErrors, globalErrors } = parseJsonApiErrors(err);

      // field errors
      for (const [field, message] of Object.entries(fieldErrors)) {
        setError?.(field as Path<T>, { type: "server", message });
      }

      // «global» (without pointer)
      if (globalErrors.length > 0) {
        setError?.("root.server", {
          type: "server",
          message: globalErrors.join("\n"),
        });
      }
    }
  };
};

export const mutationGlobalErrorHandler = (
  error: Error,
  _: unknown,
  __: unknown,
  mutation: unknown
) => {
  // 400 from server in JSON:API format
  // @ts-expect-error ignore typing
  const globalFlag = (mutation.meta as MutationMeta)?.globalErrorHandler;
  // if meta said "off" — do nothing
  if (globalFlag === "off") {
    return;
  }

  if (isJsonApiErrorDocument(error)) {
    const { globalErrors } = parseJsonApiErrors(error);

    // “global” (without pointer)
    if (globalErrors.length > 0) {
      toast(globalErrors.join("\n"));
    }
  }
};
