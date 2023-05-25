import { useNavigate, useParams } from "react-router-dom"
import { createRef, useEffect, useRef, useState } from "react";
import "./borrowBookView.css"

const backendURL = "http://localhost:8080"
const baseURL = backendURL + "/api/book"

type BookStatus =
  'AVAILABLE'
  | 'BORROWED'
  | 'RETURNED'
  | 'DAMAGED'
  | 'PROCESSING';

type Book = { id: string, title: string, author: string, genre: string, year: number, added: string, checkOutCount: number, status: BookStatus, dueDate: string | undefined, comment: string }

type CheckOut = {
  id: string,
  borrowerFirstName: string, // Need this
  borrowerLastName: string, // Need this
  borrowedBook: Book,
  checkedOutDate: string, // Need this
  dueDate: string, // Need this
  returnedDate: string,
}

export function BorrowBookView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoadingState] = useState(true);

  const [books, setBooks] = useState<Book[]>()
  const [book, setBook] = useState<Book>()

  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const returnDate = useRef<HTMLInputElement>(null);

  async function getBook(bookId?: string) {
    fetch(baseURL + "/getBook" + `?bookId=${id}`)
      .then((response) => {
        response.json().then((data) => {
          console.table(data)
          setBook(() => data)
          setLoadingState(() => false)
        })
      })
      .catch(console.error)
  }

  const fetchBook = async (bookId?: string) => {
    getBook(bookId).then(() => {
      saveCheckout()
    })
  }

  async function saveCheckout() {
    if (book === undefined) { console.error("Book not available"); return }
    let bookCopy = { ...book }
    bookCopy.status = 'BORROWED'
    bookCopy.dueDate = returnDate?.current?.value
    bookCopy.checkOutCount = book.checkOutCount + 1
    let requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // id: undefined,
        borrowerFirstName: firstnameRef?.current?.value,
        borrowerLastName: lastnameRef?.current?.value,
        borrowedBook: bookCopy,
        checkedOutDate: new Date().toISOString().slice(0.10),
        dueDate: returnDate?.current?.value,
        // returnedDate: undefined,
      })
    }
    await fetch(backendURL + "/api/checkout" + '/saveCheckout', requestOptions)
      .then(() => { console.log("Success") })
      .catch(console.error)
    requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookCopy)
    }
    await fetch(baseURL + `/saveBook`, requestOptions)
    navigate(`/book/${book.id}`)
  }

  useEffect(() => {
    if (!loading) { return }
    if (id === undefined) {
      let requestOptions = {}
      fetch(baseURL + "/getBooks", requestOptions)
        .then((response) => {
          response.json().then((data) => {
            console.log(data)
            console.table(data.content)
            setBook(() => undefined)
            setBooks(() => data.content)
            setLoadingState(() => false)
          })
        })
        .catch((err) => { console.error(err); });
      return
    }
    getBook(id)

  }, [loading])

  if (loading) {
    return (
      <main id="main">Loading book borrow form{id ? ` with book id: ${id}` : '...'}</main>
    )
  }

  if (id) {
    return (
      <main id="main" className="borrow-form-container">
        <form id="borrow-form">
          <h1 id="form-title" className="title"> Borrow form </h1>

          <label>Firstname: </label>
          <input required ref={firstnameRef} className=" borrow-form-input borrow-form-text-input" type="text" placeholder="Firstname" />
          <label>Lastname: </label>
          <input required ref={lastnameRef} className=" borrow-form-input borrow-form-text-input" type="text" placeholder="Lastname" />

          <label>Book to be borrowed: </label>
          <input disabled className=" borrow-form-input borrow-form-search-input" type="search" name="book" value={book ? book.title : ''} />

          <label>Choose return date:</label>
          <input required ref={returnDate} className=" borrow-form-input borrow-form-date-input" type="date" id="return-date-input" />

          <input type="button" onClick={() => saveCheckout()} value="Submit borrow" />
        </form>
      </main>
    )
  }

  return (
    <main id="main" className="borrow-form-container">
      <form id="borrow-form">
        <h1 id="form-title" className="title"> Borrow form </h1>

        <label>Firstname: </label>
        <input required ref={firstnameRef} className=" borrow-form-input borrow-form-text-input" type="text" placeholder="Firstname" />
        <label>Lastname: </label>
        <input required ref={lastnameRef} className=" borrow-form-input borrow-form-text-input" type="text" placeholder="Lastname" />

        <select required>
          {books?.map((aBook, key) => {
            if (aBook.status !== "AVAILABLE") { return null }
            return (
              <option onClick={() => fetchBook(aBook.id)} value={aBook.id} className="radio-button-selection" key={key}>{aBook.title}</option>
            )
          })}
        </select>

        <label>Choose return date:</label>
        <input required ref={returnDate} className=" borrow-form-input borrow-form-date-input" type="date" id="return-date-input" />

        <input type="button" onClick={() => saveCheckout()} value="Submit borrow" />
      </form>
    </main>
  )
}