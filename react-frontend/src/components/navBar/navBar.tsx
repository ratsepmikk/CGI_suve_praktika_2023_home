import { Link } from 'react-router-dom';

export function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Library</Link>
        </li>
        <li>
          <Link to="/book">Book</Link>
        </li>
      </ul>
    </nav>
  )
}