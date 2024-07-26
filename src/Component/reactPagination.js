import React from 'react'
import ReactPaginate from 'react-paginate';
const ReactPagination = ({ pageCount, onPageChange,currentPage }) => {
    return (
        <ReactPaginate
            previousLabel={'Previous '}
            nextLabel={'Next'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={onPageChange}
            containerClassName={'pagination'}
            activeClassName={'active'}
            forcePage={currentPage}
        />
    )
}

export default ReactPagination