import React from 'react';
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <p>Google Books</p>
      <ul className="nav-links">
        <NavLink to='/' exact>
        <li>Home</li>
        </NavLink>
        <NavLink to='/saved'>
        <li>Saved</li>
        </NavLink>
      </ul>
    </nav>
  )
}

export default Nav