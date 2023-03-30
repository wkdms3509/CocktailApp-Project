import Link from "next/link";

// export const paginate = (items, pageNumber, pageSize) => {
//   const startIndex = (pageNumber - 1) * pageSize;
//   return items.slice(startIndex, startIndex + pageSize);
// };

// const paginatedPosts = paginate(items, currentPage, pageSize);
// console.log(paginatedPosts);

const Pagination = ({ items, currentPage, pageSize, onPageChange }) => {
  const pageCount = Math.ceil(items / pageSize); // 35
  if (pageCount === 1) return null;
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "pageItemActive" : "pageItem"}
          >
            <a className="pageLink" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
