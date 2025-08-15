import { clsx } from "clsx";
import type { ComponentProps, ElementType } from "react";

import cls from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "withIcon";

export type ButtonProps<T extends ElementType = "button"> = {
  as?: T;
  fullWidth?: boolean;
  variant?: ButtonVariant;
} & ComponentProps<T>;

export const Button = <T extends ElementType = "button">({
  as: Component = "button",
  children,
  className,
  fullWidth = false,
  variant = "primary",
  ...props
}: ButtonProps<T>) => {
  const classNames = clsx(
    cls.button,
    cls[variant],
    fullWidth && cls.fullWidth,
    className
  );

  return (
    <Component className={classNames} {...props}>
      {children}
    </Component>
  );
};
