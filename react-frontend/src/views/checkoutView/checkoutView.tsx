import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const backendURL = "http://localhost:8080"
const baseURL = backendURL + "/api/checkout"

type BookStatus =
  'AVAILABLE'
  | 'BORROWED'
  | 'RETURNED'
  | 'DAMAGED'
  | 'PROCESSING';

type Book = { id: string, title: string, author: string, genre: string, year: number, added: string, checkOutCount: number, status: BookStatus, dueDate: string, comment: string }

type CheckOut = {
  id: string,
  borrowerFirstName: string, // Need this
  borrowerLastName: string, // Need this
  borrowedBook: Book,
  checkedOutDate: string, // Need this
  dueDate: string,
  returnedDate: string,
}

export function CheckoutView() {
  const { id } = useParams();

  const [loading, setLoadingState] = useState(true);
  const [checkout, setCheckout] = useState<CheckOut>();

  useEffect(() => {
    if (loading) {
      console.log("Opening a checkout with ID: " + id);
      fetch(baseURL + "/getCheckout" + `?checkOutId=${id}`)
        .then((response) => {
          response.json().then((data) => {
            console.log(data)
            console.table(data)
            setCheckout(() => { return data })
            setLoadingState(false)
          })
        })
        .catch((err) => { console.error(err) })
    }
  }, [id])

  if (loading) {
    return (
      <>This will be a view of a borrowed book</>
    )
  }

  return (
    <main id="main">
      <p>Borrower: {checkout?.borrowerFirstName} {checkout?.borrowerLastName}</p>
      <p>Checked out at: {checkout?.checkedOutDate}</p>
      <p>Due date: {checkout?.dueDate}</p>
      {checkout?.returnedDate ? checkout?.returnedDate : "Not returned"}
    </main>
  )
}