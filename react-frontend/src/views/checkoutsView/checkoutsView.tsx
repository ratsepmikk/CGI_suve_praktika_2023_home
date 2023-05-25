import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import "./checkoutsView.css"

import { Pagination, PaginationData, PaginationParams } from "../../components/pagination/pagination";

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
  dueDate: string, // Need this
  returnedDate: string,
}

export function CheckoutsView() {
  const navigate = useNavigate();

  const [loading, setLoadingState] = useState(true);
  const [checkouts, setCheckouts] = useState<CheckOut[]>();

  const [pageData, setPageData] = useState<PaginationData>({ pageSize: 0, pageNumber: 0, numberOfElements: 0, totalPages: 0, totalElements: 0 })

  const openCheckout = (id: string) => {
    console.log("Implement singular book page and load it, ID: " + id)
    navigate(`/checkout/${id}`)
  };

  const handlePageChange = (tryAdd: boolean) => {
    tryAdd ?
      setPageData((prev) => {
        function nextPage(current: number, max: number) { return max > current + 1 ? current + 1 : current }
        console.log(nextPage(prev.pageNumber, prev.totalPages))
        return { ...prev, pageNumber: nextPage(prev.pageNumber, prev.totalPages) }
      }) :
      setPageData((prev) => {
        function prevPage(prev: number) { return prev <= 0 ? 0 : prev - 1 }
        return { ...prev, pageNumber: prevPage(prev.pageNumber) }
      })
  };

  useEffect(() => {
    if (loading) {
      fetch(baseURL + "/getCheckouts")
        .then((response) => {
          response.json().then((data) => {
            console.log(data);
            console.table(data.content);
            setCheckouts(() => { return data.content });
            setPageData(() => {
              return {
                pageSize: data.pageable.pageSize,
                pageNumber: data.pageable.pageNumber,
                numberOfElements: data.size,
                totalPages: data.totalPages,
                totalElements: data.totalElements,
              }
            })
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
              <th className="checkout-list-header-item">Book Status: </th>
            </tr>
          </thead>
          <tbody className="checkout-list-body">
            {checkouts?.map((checkout, key) => {
              return (
                <tr className="checkout-list-row" key={key} onClick={() => { openCheckout(checkout.id) }}>
                  <td className="checkout-list-field">{checkout.borrowedBook.title}</td>
                  <td className="checkout-list-field">{checkout.borrowerFirstName} {checkout.borrowerLastName}</td>
                  <td className="checkout-list-field">{checkout.dueDate}</td>
                  <td className="checkout-list-field">{checkout.borrowedBook.status}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Pagination {...{ pageData: pageData, setPageData: setPageData, onPageChange: handlePageChange }} />
      </main>
    )
  }

  return (
    <>Nothing</>
  )

}