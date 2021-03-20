import { Link } from 'react-router-dom'
import { useAuth } from '../auth'

const Header = () => {
  const { user, signIn, signOut } = useAuth()
  return (
    <>
      <div>header</div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
      {user ? (
        <>
          {`Hi ${user.username}, `}
          <button onClick={() => signOut()}>logout</button>
        </>
      ) : null}
    </>
  )
}

export default Header
