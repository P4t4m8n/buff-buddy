import type { IGetMetaData } from "../../../../shared/models/metaData.model";
import Button from "./Button";

interface PaginationProps {
  meta?: IGetMetaData;
  onPaginate: (page: number) => void;
}

export default function Pagination({ meta, onPaginate }: PaginationProps) {
  const { totalPages = 1, currentPage = 1 } = meta || {};

  const text = `Showing page ${currentPage + 1} of ${totalPages}`;
  const linkStyle = "flex-center p-1 w-fit h-fit";

  return (
    <div className="inline-flex fill-main-orange items-center mx-4  h-full border-t border-main-orange/20">
      <p className="font-thin">{text}</p>
      <nav
        aria-label="Page navigation"
        className="ml-auto flex items-center gap-4"
      >
        <Button
          onClick={() => onPaginate(currentPage - 1)}
          aria-label="Previous Page"
          type="button"
          buttonStyle="save"
          className={linkStyle}
          disabled={currentPage < 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => onPaginate(currentPage + 1)}
          disabled={currentPage + 1 === totalPages}
          aria-label="Next Page"
          buttonStyle="save"
          type="button"
          className={linkStyle}
        >
          Next
        </Button>
      </nav>
    </div>
  );
}
