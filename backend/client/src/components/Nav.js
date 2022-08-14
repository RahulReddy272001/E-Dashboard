import React from 'react'
import { Link, useNavigate } from "react-router-dom"
const Nav = () => {
  const auth = localStorage.getItem("user")
  const navigate = useNavigate()
  const Logout = () => {
    localStorage.clear()
    navigate("/signup")
  }

  return (
    <div>
      <img className='logo'
        alt="logo"
        src="https://audimediacenter-a.akamaihd.net/system/production/media/1282/images/bde751ee18fe149036c6b47d7595f6784f8901f8/AL090142_full.jpg?1581961854"></img>
      {auth ? <ul className='nav-ul'>
        <li>
          <Link to="/">Product</Link>
        </li>
        <li>
          <Link to="/add">Add Product</Link>
        </li>




        <li><Link onClick={Logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
      </ul>
        :
        <ul className='nav-ul nav-right'>
          <li>
            <Link to="/signup">SignUp</Link>
          </li><li>
            <Link to="/login">Login</Link>
          </li>
        </ul>

      }
    </div>
  )
}

export default Nav
