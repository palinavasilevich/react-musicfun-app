import { PaginationNav } from "./pagination-nav/pagination-nav.tsx";
import cls from "./pagination.module.css";

type Props = {
  current: number;
  pagesCount: number;
  changePageNumber: (page: number) => void;
  isFetching: boolean;
};

export const Pagination = ({
  current,
  pagesCount,
  changePageNumber,
  isFetching,
}: Props) => {
  return (
    <div className={cls.container}>
      <PaginationNav
        current={current}
        pagesCount={pagesCount}
        onChange={changePageNumber}
      />
      {isFetching && "⌛️"}
    </div>
  );
};
