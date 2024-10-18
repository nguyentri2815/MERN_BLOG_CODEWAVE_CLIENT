const Pagination = ({ totalPages, onPageChange, page }) => {
  const searchParams = new URLSearchParams(window.location.search);
  const currentPage = parseInt(searchParams.get("page")) || page;

//   const range = (start, end) =>
//     Array.from({ length: end - start + 1 }, (_, i) => start + i);

//   const showEllipses = totalPages > 8;

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Maximum number of visible page numbers

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust startPage if there are not enough pages at the end
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Add first page
    if (startPage > 1) {
        pages.push(
            <button key={1} onClick={() => onPageChange(1)} className="min-w-8 min-h-8 bg-slate-400">
                1
            </button>
        );
        if (startPage > 3) pages.push(<span key="ellipsis-start">...</span>);
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
        pages.push(
            <button
                key={i}
                onClick={() => onPageChange(i)}
                className={i === currentPage ? 'text-red-400 min-w-8 min-h-8 bg-slate-400' : 'min-w-8 min-h-8 bg-slate-400'}
            >
                {i}
            </button>
        );
    }

    // Add last page
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push(<span key="ellipsis-end">...</span>);
        pages.push(
            <button key={totalPages} onClick={() => onPageChange(totalPages)} className="min-w-8 min-h-8 bg-slate-400">
                {totalPages}
            </button>
        );
    }

    return pages;
}

  return (
    <div className="pagination space-x-1 flex items-center justify-center">
      <button
        className="pagination-btn"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {/* {showEllipses && currentPage > 4 && (
        <>
          <button className="pagination-btn" onClick={() => onPageChange(1)}>
            1
          </button>
          <span className="pagination-ellipsis">...</span>
        </>
      )} */}

      {/* {range(
          Math.max(1, currentPage - 3),
          Math.min(totalPages, currentPage + 4)
        ).map((page) => (
          <button
            key={page}
            className={` ${page === currentPage ? "text-red-400" : ""}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))} */}
      {renderPageNumbers()}

      {/* {showEllipses && currentPage < totalPages - 5 && (
        <>
          <span className="pagination-ellipsis">...</span>
          <button className="" onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </button>
        </>
      )} */}

      <button
        className="pagination-btn"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
