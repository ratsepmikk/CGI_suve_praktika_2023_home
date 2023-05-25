import "./addNewBookView.css"
import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"

const backendURL = "http://localhost:8080"
const baseURL = backendURL + "/api/book"

type BookStatus =
  'AVAILABLE'
  | 'BORROWED'
  | 'RETURNED'
  | 'DAMAGED'
  | 'PROCESSING';

type Book = { id: string | undefined, title: string, author: string, genre: string, year: number, added: string, checkOutCount: number, status: BookStatus, dueDate: string | undefined, comment: string }


export function AddNewBookView() {
  const navigate = useNavigate();
  const [loading, setLoadingState] = useState(true)

  const titleRef = useRef<HTMLInputElement>(null)
  const authorRef = useRef<HTMLInputElement>(null)
  const genreRef = useRef<HTMLInputElement>(null)
  const yearRef = useRef<HTMLInputElement>(null)

  const commentRef = useRef<HTMLInputElement>(null)
  // const [bookSaved, setBookState] = useState(false)

  // const [bookData, setBookData] = useState<Book>({
  //   id: undefined,
  //   title: "",
  //   author: "",
  //   genre: "",
  //   year: 0,
  //   added: "",
  //   checkOutCount: 0,
  //   status: "PROCESSING",
  //   dueDate: "",
  //   comment: ""
  // })

  async function saveBook() {
    let book = {
      id: undefined,
      title: titleRef.current?.value,
      author: authorRef.current?.value,
      genre: genreRef.current?.value,
      year: yearRef.current?.value,
      added: new Date().toISOString().slice(0, 10),
      checkOutCount: 0,
      status: "AVAILABLE",
      dueDate: undefined,
      comment: commentRef.current?.value,
    }
    console.log("Current book:", JSON.stringify(book))

    let requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    }
    console.log("Current requestOptions:", JSON.stringify(requestOptions))
    fetch(baseURL + `/saveBook`, requestOptions).then((bookID) => {
      bookID.json().then((bookId) => {
        console.log(bookId)
        navigate(`/book/${bookId}`)
      })
    }).catch(console.error)
  }

  // if (!loading) {
  //   return (
  //     <main id="main">Here will be a view for adding new books to the library</main>
  //   )
  // }

  return (
    <main id="main" className="book-form-container">
      <form id="book-form">
        <h1 id="book-form-title" className="title"> New book form </h1>

        <label>Title </label>
        <input required ref={titleRef} className=" book-form-input book-form-text-input" type="text" placeholder="Title" />
        <label>Author: </label>
        <input required ref={authorRef} className=" book-form-input book-form-text-input" type="text" placeholder="Author" />
        <label>Genre: </label>
        <input required ref={genreRef} className=" book-form-input book-form-text-input" type="text" placeholder="Genre" />
        <label>Year of release: </label>
        <input required ref={yearRef} className=" book-form-input book-form-text-input" type="number" placeholder="Release year" />

        {/* Not sure about this one */}
        <label>Comment: </label>
        <input ref={commentRef} className=" book-form-input book-form-text-input" type="text" placeholder="Comment (optional)" />

        <input type="button" onClick={() => saveBook()} value="Submit book" />
      </form>
    </main>
  )

}