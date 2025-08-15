import clsx from "clsx";
import { PaginationNav } from "./PaginationNav/PaginationNav.tsx";
import cls from "./Pagination.module.css";
import { SmallLoader } from "../Loader/Loader.tsx";

type Props = {
  currentPage: number;
  pagesCount: number;
  onChangePageNumber: (page: number) => void;
  isFetching: boolean;
  className?: string;
};

export const Pagination = ({
  currentPage,
  pagesCount,
  className,
  isFetching,
  onChangePageNumber,
}: Props) => {
  return (
    <div
      className={clsx(cls.pagination, className)}
      role="navigation"
      aria-label="Pagination"
    >
      <PaginationNav
        current={currentPage}
        pagesCount={pagesCount}
        onChange={onChangePageNumber}
      />
      {isFetching && <SmallLoader />}
    </div>
  );
};
