import { useState, useEffect, useRef } from "react"
import "./pagination.css"

export type PaginationParams = {
  pageData: PaginationData,
  setPageData: React.Dispatch<React.SetStateAction<PaginationData>>,
  onPageChange: (tryAdd: boolean) => void,
  setLoadingState: React.Dispatch<React.SetStateAction<boolean>>
}

export type PaginationData = {
  pageSize: number,
  pageNumber: number,
  numberOfElements: number,
  totalPages: number,
  totalElements: number,
}

export function Pagination({ pageData, onPageChange, setPageData, setLoadingState }: PaginationParams) {
  const [loading, setLoading] = useState(false)

  // Current stats
  const [pageSize, setPageSize] = useState(0);
  const [numberOfElements, setNumberOfElements] = useState(0) // items on current page? (Needs implementation)
  // Backend stats
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0) // total Elements in backEnd
  // Refs
  const inputTimerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

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

  // function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
  //   event.preventDefault();
  //   setPageData((prev) => { return { ...prev, pageNumber: Number(event.target.value) } })
  //   setLoadingState(() => true)
  // }

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    let value = (Number(event.target.value) - 1) < pageData.totalPages ? Number(event.target.value) - 1 : pageData.totalPages - 1;
    setPageData((prev) => ({ ...prev, pageNumber: value > 0 ? value : 0 }));

    if (inputTimerRef.current) {
      clearTimeout(inputTimerRef.current);
    }

    inputTimerRef.current = setTimeout(() => {

      setLoadingState(true);
      inputTimerRef.current = null;
    }, 1000); // Change the delay value as needed (in milliseconds)
  }

  function handleInputFocus() {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }

  if (!loading) {
    return (
      <div className="pagination-bar">
        <button onClick={pageDown}>&lt;</button> page: <input ref={inputRef} className="pagination-input" onChange={(event) => { changeHandler(event) }} onFocus={handleInputFocus} type="number" value={pageData.pageNumber + 1} /> out of: {totalPages} <button onClick={pageUp}>&gt;</button> Showing: {totalElements <= (pageSize * pageData.pageNumber) + 1 ? totalElements : (pageSize * pageData.pageNumber) + 1}-{totalElements <= (pageSize * (pageData.pageNumber + 1)) ? totalElements : (pageSize * (pageData.pageNumber + 1))} out of: {totalElements}
      </div>
    )
  }

  return (
    <p>This will be pagination</p>
  )
}