import { useNavigate } from 'react-router-dom';

export function NoRouteFound() {
  return (
    <p>Error, no such route exists</p>
  )
}

export function NoBookFound() {
  const navigate = useNavigate();
  return (
    <main id="main">
      <p>Error, choose an existing book</p>
      <button onClick={() => {
        navigate('/')
      }}>Return to booklist</button>
    </main>
  )
}