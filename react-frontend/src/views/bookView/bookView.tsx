import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

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
export function BookView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoadingState] = useState(true);
  const [book, setBook] = useState<Book>();

  useEffect(() => {
    if (loading) {
      console.log("Opening a book with ID: " + id);
      getBook(id)
    }
  }, [id])

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

  const checkout = () => {
    console.log("Opening a checkout modal")
    navigate(`/checkout/add/${id}`)
  }

  // const fetchBook = async (bookId?: string) => {
  //   getBook(bookId).then(() => {
  //     saveBook()
  //   })
  // }

  // const returnBook = () => {
  //   console.log("Returning book: ", book?.title)
  //   if (book === undefined) { fetchBook(id); return }
  //   saveBook()
  //   // saveCheckout()
  // }

  // const saveBook = () => {
  //   if (book === undefined) { return }
  //   let bookCopy = { ...book }
  //   bookCopy.status = "RETURNED"
  // }

  if (loading) {
    <p>This will be a book</p>
  }

  return (
    <main id="main">
      <p>{book?.id}</p>
      <p>{book?.title}</p>
      <p>{book?.author}</p>
      <p>{book?.genre}</p>
      <p>{book?.year}</p>
      <p>Added: {book?.added}</p>
      <p>CheckOut's: {book?.checkOutCount}</p>
      <p>Status: {book?.status}</p>
      {book?.status === "BORROWED" ? (<p>Due Date: {book?.dueDate}</p>) : (null)}
      {/* {book?.status === "BORROWED" ? (<button onClick={() => { returnBook() }}>Return Book</button>) : (null)} */}
      {book?.status === "AVAILABLE" ? (<button onClick={() => { checkout() }}>Borrow</button>) : (null)}
      <p>Comment: {book?.comment}</p>
    </main>
  )
}