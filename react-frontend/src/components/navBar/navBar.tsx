import { Link } from 'react-router-dom';
import "./navBar.css"

export function NavBar() {
  return (
    <nav id="navbar">
      <ul id="navbar-list">
        <li className="navbar-item">
          <Link to="/">Library</Link>
        </li>
        <li className="navbar-item">
          <Link to="/checkouts">Checkouts</Link>
        </li>
        <li className="navbar-item">
          <Link to="/book/add">Add new book</Link>
        </li>
        <li className="navbar-item">
          <Link to="/checkout/add">Borrow out a book</Link>
        </li>
      </ul>
    </nav>
  )
}