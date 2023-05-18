import classNames from "classnames";
import { PaginationInfo } from "../constants/productTypes";
import { Button, PageNum } from "./PgBtn";

const Pagination = (props: PaginationInfo) => {
  const { total, limit, page, setPage } = props;
  // 필요한 페이지의 개수
  const numPages = Math.ceil(total / limit); // 90 / 9 = 10

  return (
    <div className="flex justify-center items-center gap-x-4 mt-14 mb-8 text-sm mx-10 md:mx-0 lg:mx-0 xl:mx-0">
      <Button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        // className="prev_btn"
        className={classNames("prev_btn", { selected: page === page - 1 })}
        // selected={page === page - 1}
      >
        &lt;
      </Button>
      <div>
        {Array(numPages)
          .fill(undefined)
          .map((_, i) => (
            <PageNum
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : undefined}
              // selected={page === i + 1}
              className={classNames("page_btn", { selected: page === i + 1 })}
            >
              {i + 1}
            </PageNum>
          ))}
      </div>
      <Button
        onClick={() => setPage(page + 1)}
        disabled={page === numPages}
        className="next_btn"
      >
        &gt;
      </Button>
    </div>
  );
};

export default Pagination;
