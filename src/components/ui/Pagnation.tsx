import SkeletonPagination from "../Skeleton/SkeletonPagination";
import Button from "./Button";

interface IProps {
  isLoading: boolean;
  page: number;
  setPage: (val: number) => void;
  pageSize: number;
}

const Pagination = ({ isLoading, page, setPage, pageSize }: IProps) => {
  return (
    <div className="flex items-center justify-between gap-3 py-4">
      {/* Left Info */}
      <p className="text-sm text-muted-foreground">
        Page <span className="font-semibold">{page}</span> of{" "}
        <span className="font-semibold">{pageSize}</span>
      </p>

      {/* Buttons */}
      <div className="flex items-center justify-center gap-3">
        <Button
          variant="outline"
          disabled={page === 1 || isLoading}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </Button>

        <Button
          variant="outline"
          disabled={page === pageSize || isLoading}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
