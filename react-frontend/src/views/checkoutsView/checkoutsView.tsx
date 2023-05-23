import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import "./checkoutsView.css"

import { Pagination } from "../../components/pagination/pagination";

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

export function CheckoutsView() {
  const navigate = useNavigate();

  const [loading, setLoadingState] = useState(true);
  const [checkouts, setCheckouts] = useState<CheckOut[]>();

  const openCheckout = (id: string) => {
    console.log("Implement singular book page and load it, ID: " + id)
    navigate(`/checkout/${id}`)
  };

  useEffect(() => {
    if (loading) {
      fetch(baseURL + "/getCheckouts")
        .then((response) => {
          response.json().then((data) => {
            console.log(data);
            console.table(data.content);
            setCheckouts(() => { return data.content });
            setLoadingState(() => { return true });
          })
        })
        .catch((err) => { console.error(err) });
      return
    }
    console.log("Checkout list received!")
  }, [loading])

  if (loading) {
    return (
      <main id="main">
        <table id="checkout-list">
          <thead className="checkout-list-header">
            <tr className="checkout-list-header-row">
              <th className="checkout-list-header-item">Book title: </th>
              <th className="checkout-list-header-item">Borrowed by: </th>
              <th className="checkout-list-header-item">Return date: </th>
            </tr>
          </thead>
          <tbody className="checkout-list-body">
            {checkouts?.map((checkout, key) => {
              return (
                <tr className="checkout-list-row" key={key} onClick={() => { openCheckout(checkout.id) }}>
                  <td className="checkout-list-field">{checkout.borrowedBook.title}</td>
                  <td className="checkout-list-field">{checkout.borrowerFirstName} {checkout.borrowerLastName}</td>
                  <td className="checkout-list-field">{checkout.dueDate}</td>
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
    <>Nothing</>
  )

}