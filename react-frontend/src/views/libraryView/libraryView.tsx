import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { Pagination, PaginationParams, PaginationData } from "../../components/pagination/pagination"

import "./libraryView.css"

const backendURL = "http://localhost:8080"
const baseURL = backendURL + "/api/book"

type BookStatus =
  'AVAILABLE'
  | 'BORROWED'
  | 'RETURNED'
  | 'DAMAGED'
  | 'PROCESSING';

type Book = { id: string, title: string, author: string, genre: string, year: number, added: string, checkOutCount: number, status: BookStatus, dueDate: string, comment: string }

export function LibraryView() {
  const navigate = useNavigate();

  const [loading, setLoadingState] = useState(true)
  const [books, setBooks] = useState<Book[]>()

  const [pageData, setPageData] = useState<PaginationData>({ pageSize: 20, pageNumber: 0, numberOfElements: 0, totalPages: 0, totalElements: 0 })

  const openBook = (id: string) => {
    console.log("Implement singular book page and load it, ID: " + id)
    navigate(`/book/${id}`)
  }

  const handlePageChange = (tryAdd: boolean) => {
    tryAdd ?
      setPageData((prev) => {
        function nextPage(current: number, max: number) { return max > current + 1 ? current + 1 : current }
        setLoadingState(() => true)
        return { ...prev, pageNumber: nextPage(prev.pageNumber, prev.totalPages) }
      }) :
      setPageData((prev) => {
        function prevPage(prev: number) { return prev <= 0 ? 0 : prev - 1 }
        setLoadingState(() => true)
        return { ...prev, pageNumber: prevPage(prev.pageNumber) }
      })
  };

  useEffect(() => {
    if (loading) {
      fetch(baseURL + `/getBooks?pageNumber=${pageData.pageNumber}&pageSize=${pageData.pageSize}`)
        .then((response) => {
          response.json().then((data) => {
            console.log(data)
            console.table(data.content);
            setBooks(() => { return data.content });
            setPageData(() => {
              return {
                pageSize: data.pageable.pageSize,
                pageNumber: data.pageable.pageNumber,
                numberOfElements: data.size,
                totalPages: data.totalPages,
                totalElements: data.totalElements,
              }
            })
            setLoadingState(() => { return false });
          })
        })
        .catch((err) => { console.error(err) });
      return
    }
    console.log("Books list received!")
  }, [loading])

  if (loading) {
    return (
      <main id="main"><p>This will be a view of all the books a.k.a the library</p></main>
    )
  }

  return (
    <main id="main">
      <table id="book-list">
        <thead className="book-list-header">
          <tr className="book-list-header-row">
            <th className="book-list-header-item">Book title: </th>
            <th className="book-list-header-item">Status: </th>
          </tr>
        </thead>
        <tbody className="book-list-body">
          {books?.map((book, key) => {
            return (
              <tr className="book-list-row" key={key} onClick={() => { openBook(book.id) }}>
                <td className="book-list-field">{book.title}</td>
                <td className="book-list-field">{book.status}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Pagination {...{ pageData: pageData, setPageData: setPageData, onPageChange: handlePageChange, setLoadingState: setLoadingState }} />
    </main>
  )
}