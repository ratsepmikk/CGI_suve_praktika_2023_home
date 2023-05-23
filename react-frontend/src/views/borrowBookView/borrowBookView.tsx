import { useParams } from "react-router-dom"


export function BorrowBookView() {
  const { id } = useParams();
  return (
    <main id="main">Here will be a view for borrowing books + searching them{id ? `, Book id: ${id}` : '.'}</main>
  )
}