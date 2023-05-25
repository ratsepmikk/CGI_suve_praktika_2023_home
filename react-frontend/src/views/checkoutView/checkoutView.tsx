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

type Book = { id: string, title: string, author: string, genre: string, year: number, added: string, checkOutCount: number, status: BookStatus, dueDate: string | undefined, comment: string }

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
  }, [loading])

  const returnBook = (bookId: string | undefined) => {
    if (bookId === undefined) { console.error("bookId is undefined"); return }
    console.log("I want to return a book with bookId: " + bookId)
    if (!checkout) { console.error("Empty checkout data"); return }
    let checkoutCopy = { ...checkout, borrowedBook: { ...checkout.borrowedBook } }
    checkoutCopy.returnedDate = new Date().toISOString().slice(0, 10);
    checkoutCopy.borrowedBook.status = "RETURNED";
    console.log("------------------->", JSON.stringify(checkoutCopy))
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(checkoutCopy)
    };
    fetch(baseURL + '/saveCheckout', requestOptions)
      .then(() => { console.log("Checkout save success"); setLoadingState(() => true) })
      .catch(console.error)
    requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkoutCopy.borrowedBook)
    }
    fetch(backendURL + `/api/book/saveBook`, requestOptions)
      .then(() => { console.log("Book save success"); setLoadingState(() => true) })
      .catch(console.error)
  }

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
      {checkout?.returnedDate ? (<p>Returned at: {checkout?.returnedDate}</p>) : (<button onClick={() => { returnBook(checkout?.borrowedBook?.id) }}>Return book</button>)}
    </main>
  )
}