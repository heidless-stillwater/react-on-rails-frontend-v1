import PropTypes from 'prop-types'

function Pagination({ currentPage, totalPosts, postsPerPage, onPageChange }) {
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  console.log('totalPages:', totalPages)

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const getVisiblePageNumbers = () => {
    if (totalPages <= 10) {
      return createRange(1, totalPages)
    }

    if (currentPage <= 6) {
      const lastPageBeforeEllipsis = 8
      return [...createRange(1, lastPageBeforeEllipsis), '...', totalPages]
    }

    if (currentPage >= totalPages - 5) {
      const firstPageAfterEllipsis = totalPages - 8
      return [1, '...', ...createRange(firstPageAfterEllipsis, totalPages)]
    }

    return [1, '...', ...createMiddlePages(), '...', totalPages]
  }

  const createRange = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  const createMiddlePages = () => {
    const middlePagesStart = Math.max(2, currentPage - 3)
    const middlePagesEnd = Math.min(currentPage + 3, totalPages - 1)

    return createRange(middlePagesStart, middlePagesEnd)
  }

  {
    getVisiblePageNumbers().map((page, index) => {
      typeof page === 'number' ? (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ) : (
        <span key={`ellipsis-${index}`} style={{ margin: '0 5px' }}>
          {page}
        </span>
      )
    })
  }

  return (
    <div>
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </button>

      {getVisiblePageNumbers().map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={page === currentPage}
          >
            {page}
          </button>
        ) : (
          <span key={`ellipsis-${index}`} style={{ margin: '0 5px' }}>
            {page}
          </span>
        )
      )}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        Next
      </button>
    </div>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPosts: PropTypes.number.isRequired,
  postsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
}

export default Pagination
