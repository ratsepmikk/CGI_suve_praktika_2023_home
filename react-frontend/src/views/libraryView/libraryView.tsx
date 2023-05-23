import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { Pagination } from "../../components/pagination/pagination"

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

  const [libraryLoaded, setLoadingState] = useState(false)
  const [books, setBooks] = useState<Book[]>()

  const openBook = (id: string) => {
    console.log("Implement singular book page and load it, ID: " + id)
    navigate(`/book/${id}`)
  }

  useEffect(() => {
    if (!libraryLoaded) {
      fetch(baseURL + "/getBooks")
        .then((response) => {
          response.json().then((data) => {
            console.table(data.content);
            setBooks(() => { return data.content });
            setLoadingState(() => { return true });
          })
        })
        .catch((err) => { console.error(err) });
      return
    }
    console.log("Books list received!")
  }, [libraryLoaded])

  if (libraryLoaded) {
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
        <Pagination />
      </main>
    )
  }

  return (
    <main id="main"><p>This will be a view of all the books a.k.a the library</p></main>
  )
}