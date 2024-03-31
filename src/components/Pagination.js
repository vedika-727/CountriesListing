import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const allPages = [];
  for (let i = 1; i <= totalPages; i++) {
    allPages.push(
      <button key={`button-${i}`} onClick={() => onPageChange(i)} disabled={currentPage === i}>
        {i}
      </button>
    );
  }

  return (
    <div className='pagination'>
      {allPages.length > 1 && <span>Page: </span>}
      {allPages}
    </div>
  );
}

export default Pagination;