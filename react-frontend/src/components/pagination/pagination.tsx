import { useState, useEffect } from "react"

export type PaginationParams = {
  pageData: PaginationData,
  setPageData: React.Dispatch<React.SetStateAction<PaginationData>>,
  onPageChange: (tryAdd: boolean) => void,
}

export type PaginationData = {
  pageSize: number,
  pageNumber: number,
  numberOfElements: number,
  totalPages: number,
  totalElements: number,
}

export function Pagination({ pageData, onPageChange }: PaginationParams) {
  const [loading, setLoading] = useState(false)

  // Current stats
  const [pageSize, setPageSize] = useState(0);
  const [numberOfElements, setNumberOfElements] = useState(0) // items on current page? (Needs implementation)
  // Backend stats
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0) // total Elements in backEnd

  useEffect(() => {
    if (pageData) {
      setPageSize(pageData.pageSize);
      // setPageNumber(pageData.pageNumber);
      setNumberOfElements(pageData.numberOfElements);
      setTotalPages(pageData.totalPages);
      setTotalElements(pageData.totalElements);
    }
  }, [pageData]);

  const pageUp = () => {
    onPageChange(true)
  }

  const pageDown = () => {
    onPageChange(false)
  }

  if (!loading) {
    return (
      <div className="pagination-bar">
        <button onClick={pageDown}>&lt;</button> page: {pageData.pageNumber + 1} out of: {totalPages} <button onClick={pageUp}>&gt;</button> Showing: {totalElements <= (pageSize * pageData.pageNumber) + 1 ? totalElements : (pageSize * pageData.pageNumber) + 1}-{totalElements <= (pageSize * (pageData.pageNumber + 1)) ? totalElements : (pageSize * (pageData.pageNumber + 1))} out of: {totalElements}
      </div>
    )
  }

  return (
    <p>This will be pagination</p>
  )
}