import { useState } from "react"

export function Pagination() {
  const [loading, setLoading] = useState(false)
  // Current stats
  const [pageSize, setPageSize] = useState(20);
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfElements, setNumberOfElements] = useState(20) // items on current page? (Needs implementation)
  // Backend stats
  const [totalPages, setTotalPages] = useState(50)
  const [totalElements, setTotalElements] = useState(1000) // total Elements in backEnd

  const pageUp = () => {
    setPageNumber((prev) => {
      return prev >= totalPages ? totalPages : prev + 1
    })
  }

  const pageDown = () => {
    setPageNumber((prev) => {
      return prev <= 0 ? 0 : prev - 1
    })
  }

  if (!loading) {
    return (
      <div className="pagination-bar">
        <button onClick={pageDown}>&lt;</button> page: {pageNumber} out of: {totalPages} <button onClick={pageUp}>&gt;</button> Showing: {pageSize * pageNumber}-{totalElements <= (pageSize * (pageNumber + 1)) ? totalElements : (pageSize * (pageNumber + 1))} out of: {totalElements}
      </div>
    )
  }

  return (
    <p>This will be pagination</p>
  )
}