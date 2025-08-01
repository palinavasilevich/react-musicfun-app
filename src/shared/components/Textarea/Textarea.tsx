import { clsx } from "clsx";
import type { ComponentProps, ReactNode } from "react";

import { useGetId } from "../../hooks/useGetId";
import { Typography } from "../Typography";
import cls from "./Textarea.module.css";

export type TextareaProps = {
  errorMessage?: string;
  label?: ReactNode;
} & ComponentProps<"textarea">;

export const Textarea = ({
  className,
  errorMessage,
  id,
  label,
  ...props
}: TextareaProps) => {
  const showError = Boolean(errorMessage);
  const textareaId = useGetId(id);

  return (
    <div className={clsx(cls.box, className)}>
      {label && (
        <Typography variant="label" as="label" htmlFor={textareaId}>
          {label}
        </Typography>
      )}

      <textarea
        className={clsx(cls.textarea, showError && cls.error)}
        id={textareaId}
        {...props}
      />

      {showError && <Typography variant="error">{errorMessage}</Typography>}
    </div>
  );
};
