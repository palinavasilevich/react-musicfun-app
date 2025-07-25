import { PaginationNav } from "./PaginationNav/PaginationNav.tsx";

import cls from "./Pagination.module.css";

type Props = {
  currentPage: number;
  pagesCount: number;
  onChangePageNumber: (page: number) => void;
  isFetching: boolean;
};

export const Pagination = ({
  currentPage,
  pagesCount,
  onChangePageNumber,
  isFetching,
}: Props) => {
  return (
    <div className={cls.container}>
      <PaginationNav
        current={currentPage}
        pagesCount={pagesCount}
        onChange={onChangePageNumber}
      />
      {isFetching && "⌛️"}
    </div>
  );
};
