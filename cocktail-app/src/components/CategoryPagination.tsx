import classNames from "classnames";
import { useState } from "react";
import { PaginationInfo } from "../constants/productTypes";
import { Button, PageNum } from "./PgBtn";

const Pagination = (props: PaginationInfo) => {
  const { total, limit, page, setPage } = props;
  // 필요한 페이지의 개수
  const numPages = Math.ceil(total / limit); // 90 / 9 = 10 / 35

  const [startPage, setStartPage] = useState(1); // 시작 페이지

  const handleClick = (pageNumber: number) => {
    setPage(pageNumber); // 페이지 번호를 클릭하면 해당 페이지로 이동
  };

  const handlePrev = () => {
    if (page - 10 >= 1) {
      setPage(page - 10); // 이전 버튼을 누를 때 현재 페이지에서 10을 빼서 이전 페이지로 이동
      setStartPage(startPage - 10); // 시작 페이지 업데이트
    } else {
      setPage(1); // 이전 페이지가 1보다 작아질 경우 첫 번째 페이지로 이동
      setStartPage(1); // 시작 페이지도 1로 설정
    }
  };

  const handleNext = () => {
    if (page + 10 <= numPages) {
      console.log("변경 전", page);
      setPage(page + 10); // 다음 버튼을 누를 때 현재 페이지에서 10을 더하여 다음 페이지로 이동
      setStartPage(page + 1); // 시작 페이지 업데이트
      console.log("변경 후", page);
    } else {
      setPage(numPages); // 다음 페이지가 총 페이지 수를 넘어갈 경우 마지막 페이지로 이동
      setStartPage(Math.max(1, numPages - 9)); // 시작 페이지 업데이트 (최대 10개 페이지를 유지하기 위해)
    }
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = startPage; i < Math.min(startPage + 10, numPages + 1); i++) {
      pages.push(
        <PageNum
          key={i}
          onClick={() => handleClick(i)}
          aria-current={startPage === i ? "page" : undefined}
          selected={startPage === i}
          key={i + 1}
        >
          {i}
        </PageNum>
      );
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-x-4 mt-14 mb-8 text-sm mx-10 md:mx-0 lg:mx-0 xl:mx-0">
      <Button
        onClick={() => handlePrev(page - 1)}
        disabled={page === 1}
        // selected={page === page - 1}
      >
        &lt;
      </Button>
      <div>{renderPagination()}</div>
      <Button
        onClick={handleNext}
        disabled={page === numPages}
        className="next_btn"
      >
        &gt;
      </Button>
    </div>

    // <div className="flex justify-center items-center gap-x-4 mt-14 mb-8 text-sm mx-10 md:mx-0 lg:mx-0 xl:mx-0">
    //   <Button
    //     onClick={() => setPage(page - 1)}
    //     disabled={page === 1}
    //     // selected={page === page - 1}
    //   >
    //     &lt;
    //   </Button>
    //   <div>
    //     {Array(numPages)
    //       .fill(undefined)
    //       .map((_, i) => (
    //         <PageNum
    //           key={i + 1}
    //           onClick={() => setPage(i + 1)}
    //           aria-current={page === i + 1 ? "page" : undefined}
    //           selected={page === i + 1}
    //         >
    //           {i + 1}
    //         </PageNum>
    //       ))}
    //   </div>
    //   <Button
    //     onClick={() => setPage(page + 1)}
    //     disabled={page === numPages}
    //     className="next_btn"
    //   >
    //     &gt;
    //   </Button>
    // </div>
  );
};

export default Pagination;

{
  /* <div className="flex justify-center items-center gap-x-4 mt-14 mb-8 text-sm mx-10 md:mx-0 lg:mx-0 xl:mx-0">
  <Button
    onClick={() => setPage(page - 1)}
    disabled={page === 1}
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
          selected={page === i + 1}
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
</div>; */
}
