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
  const [data, setData] = useState<Book[]>()

  const openBook = (id: string) => {
    console.log("Implement book page and load it, ID: " + id)
    navigate(`/book/${id}`)
  }

  useEffect(() => {
    if (!libraryLoaded) {
      fetch(baseURL + "/getBooks")
        .then((response) => {
          response.json().then((data) => {
            console.table(data.content);
            setData(() => { return data.content });
            setLoadingState(() => { return true });
          })
        })
        .catch((err) => { console.error(err) });
      return
    }
    console.log("Data received!")
  }, [libraryLoaded])

  if (libraryLoaded) {
    return (
      <>
        <ul id="library">
          {data?.map((book, key) => {
            return (
              <li className="library-card" key={key} onClick={() => { openBook(book.id) }}>
                <p>This is a book called: {book.title}</p>
              </li>
            )
          })}
        </ul>
        <Pagination />
      </>
    )
  }

  return (
    <p>This will be a view of all the books a.k.a the library</p>
  )
}