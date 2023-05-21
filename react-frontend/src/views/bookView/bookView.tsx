import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const backendURL = "http://localhost:8080"
const baseURL = backendURL + "/api/book"

type BookStatus =
  'AVAILABLE'
  | 'BORROWED'
  | 'RETURNED'
  | 'DAMAGED'
  | 'PROCESSING';

type Book = { id: string, title: string, author: string, genre: string, year: number, added: string, checkOutCount: number, status: BookStatus, dueDate: string, comment: string }

export function BookView() {
  const { id } = useParams();
  const [loading, setLoadingState] = useState(true);
  const [book, setBook] = useState<Book>();

  useEffect(() => {
    if (loading) {
      console.log("Opening a book with ID: " + id);
      fetch(baseURL + "/getBook" + `?bookId=${id}`)
        .then((response) => {
          response.json().then((data) => {
            console.table(data)
            setBook(() => { return data })
            setLoadingState(false)
          })
        })
        .catch((err) => { console.error(err) })
    }
  }, [id])

  if (loading) {
    <p>This will be a book</p>
  }

  return (
    <>
      <p>{book?.title}</p>
      <p>{book?.author}</p>
      <p>{book?.genre}</p>
      <p>{book?.year}</p>
      <p>Added: {book?.added}</p>
      <p>CheckOut's: {book?.checkOutCount}</p>
      <p>Status: {book?.status}</p>
      {book?.status === "BORROWED" ? (<p>Due Date: {book?.dueDate}</p>) : (<></>)}
      {book?.status === "BORROWED" ? (<p>Comment: {book?.comment}</p>) : (<></>)}
    </>
  )
}