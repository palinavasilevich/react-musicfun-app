import { getPaginationPages } from "../utils/get-pagination-pages.ts";

import cls from "./pagination-nav.module.css";

type Props = {
  current: number;
  pagesCount: number;
  onChange: (page: number) => void;
};

const SIBLING_COUNT = 1;

export const PaginationNav = ({ current, pagesCount, onChange }: Props) => {
  const pages = getPaginationPages(current, pagesCount, SIBLING_COUNT);

  return (
    <div className={cls.pagination}>
      {pages.map((item, idx) =>
        item === "..." ? (
          <span className={cls.ellipsis} key={`ellipsis-${idx}`}>
            ...
          </span>
        ) : (
          <button
            key={item}
            className={
              item === current
                ? `${cls.pageButton} ${cls.pageButtonActive}`
                : cls.pageButton
            }
            onClick={() => item !== current && onChange(Number(item))}
            disabled={item === current}
            type="button"
          >
            {item}
          </button>
        )
      )}
    </div>
  );
};
