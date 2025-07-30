import type { ReactNode, ComponentProps } from "react";
import { clsx } from "clsx";
import { SearchIcon } from "../../icons";

import cls from "./SearchField.module.css";

export type SearchFieldProps = {
  label?: ReactNode;
  placeholder?: string;
} & ComponentProps<"input">;

export const SearchField = ({
  className,
  placeholder = "Search...",
  ...props
}: SearchFieldProps) => {
  return (
    <div className={clsx(cls.inputWrapper, className)}>
      <SearchIcon className={cls.searchIcon} />
      <input
        className={clsx(cls.input)}
        type="text"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};
