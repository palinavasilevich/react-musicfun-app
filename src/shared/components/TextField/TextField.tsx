import { clsx } from "clsx";
import type { ComponentProps, ReactNode } from "react";

import { useGetId } from "../../hooks/useGetId";
import { Typography } from "../Typography";
import cls from "./TextField.module.css";

export type TextFieldSize = "m" | "l";

export type TextFieldProps = {
  errorMessage?: string;
  label?: ReactNode;
  icon?: ReactNode;
  inputSize?: TextFieldSize;
} & ComponentProps<"input">;

export const TextField = ({
  className,
  errorMessage,
  id,
  icon,
  label,
  inputSize = "m",
  ...props
}: TextFieldProps) => {
  const showError = Boolean(errorMessage);
  const inputId = useGetId(id);

  return (
    <div className={clsx(cls.box, className)}>
      {label && (
        <Typography variant="label" as="label" htmlFor={inputId}>
          {label}
        </Typography>
      )}

      <div className={cls.inputWrapper}>
        {icon && <span className={cls.icon}>{icon}</span>}
        <input
          className={clsx(
            cls.input,
            showError && cls.error,
            icon && cls.withIcon,
            inputSize === "l" && cls.large
          )}
          id={inputId}
          type={"text"}
          {...props}
        />
      </div>

      {showError && <Typography variant="error">{errorMessage}</Typography>}
    </div>
  );
};
