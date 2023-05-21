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
  return (
    <></>
  )
}