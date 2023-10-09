import { useState } from "react";
import { Button, PgBtn } from "./PgBtn";
const Pagination = (props) => {
    const { total, limit, page, setPage } = props;
    const numPages = Math.ceil(total / limit);
    const [currPage, setCurrPage] = useState(page);
    let firstNum = currPage - (currPage % 5) + 1;
    let lastNum = currPage - (currPage % 5) + 5;
    return (<>
      {/* <div className="flex mx-auto justify-center m-16 p-4 items-center gap-8 w-60"> */}
      <div className="flex justify-center items-center gap-x-4 mt-14 mb-8 text-sm mx-10 md:mx-0
      lg:mx-0 xl:mx-0">
        <Button onClick={() => {
            setPage(page - 5);
            setCurrPage(page - 5);
        }} disabled={page === 1}>
          &lt;
        </Button>
        <PgBtn onClick={() => {
            setPage(firstNum);
        }} aria-current={page === firstNum} selected={page === 1}>
          {firstNum}
        </PgBtn>
        {Array(4)
            .fill(undefined)
            .map((_, i) => {
            if (i <= 2) {
                return (<PgBtn 
                // border="true"
                key={i + 1} onClick={() => {
                        setPage(firstNum + 1 + i);
                    }} selected={page === firstNum + 1 + i} aria-current={page === firstNum + 1 + i}>
                  {firstNum + 1 + i}
                </PgBtn>);
            }
            else if (i >= 3) {
                return (<PgBtn 
                // border="true"
                key={i + 1} onClick={() => setPage(lastNum)} selected={page === firstNum + 1 + i} aria-current={page === lastNum}>
                  {lastNum}
                </PgBtn>);
            }
        })}
        <Button onClick={() => {
            setPage(page + 5);
            setCurrPage(page + 5);
        }} disabled={page === numPages}>
          &gt;
        </Button>
      </div>
    </>);
};
export default Pagination;
