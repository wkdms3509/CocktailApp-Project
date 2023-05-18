import classNames from "classnames";
import { useState } from "react";
import { PaginationInfo } from "../constants/productTypes";
import { PgBtn } from "./PgBtn";

const Pagination = (props: PaginationInfo) => {
  const { total, limit, page, setPage } = props;
  const numPages = Math.ceil(total / limit);
  const [currPage, setCurrPage] = useState(page);
  let firstNum = currPage - (currPage % 5) + 1;
  let lastNum = currPage - (currPage % 5) + 5;

  return (
    <>
      <div className="flex mx-auto justify-center m-16 p-4 items-center gap-8 w-60">
        <button
          onClick={() => {
            setPage(page - 5);
            setCurrPage(page - 5);
          }}
          disabled={page === 1}
        >
          &lt;
        </button>
        <PgBtn
          onClick={() => {
            setPage(firstNum);
          }}
          aria-current={page === firstNum}
        >
          {firstNum}
        </PgBtn>
        {Array(4)
          .fill(undefined)
          .map((_, i) => {
            if (i <= 2) {
              return (
                <PgBtn
                  // border="true"
                  key={i + 1}
                  onClick={() => {
                    setPage(firstNum + 1 + i);
                    // console.log('i', i)
                  }}
                  // selected={page === firstNum + 1 + i}
                  className={classNames("page_btn", {
                    seleted: page === firstNum + 1 + i,
                  })}
                  aria-current={page === firstNum + 1 + i}
                >
                  {firstNum + 1 + i}
                </PgBtn>
              );
            } else if (i >= 3) {
              return (
                <PgBtn
                  // border="true"
                  key={i + 1}
                  onClick={() => setPage(lastNum)}
                  // selected={page === firstNum + 1 + i}
                  className={classNames("next_btn", {
                    selected: page === firstNum + 1 + i,
                  })}
                  aria-current={page === lastNum}
                >
                  {lastNum}
                </PgBtn>
              );
            }
          })}
        <button
          onClick={() => {
            setPage(page + 5);
            setCurrPage(page + 5);
          }}
          disabled={page === numPages}
        >
          &gt;
        </button>
      </div>
    </>
  );
};

export default Pagination;
