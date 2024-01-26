import React, { useState } from 'react'
import '../css/Navbar.css'
import { Link } from 'react-router-dom'
import { VscAccount } from "react-icons/vsc";
import logo from '../assets/InterContinental-logo.png'

const Navbar = () => {

  const userToken = sessionStorage.getItem('token')

  return (
    <div className='Navbar-Container'>
        <nav className='navItems'>
          <div>

          <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>

            <ul id='nav-ul'>
              <li>
                <Link to="/" className='nav-links'>Intercontinental</Link>
              </li>
              <li>
                <Link to="/rent" className='nav-links'>Book now</Link>
              </li>
              <li>
                <Link to="/about" className='nav-links'>About</Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className='navProfile'>
              {!userToken ? (
                <div>
                  <button className='loginbutton'>
                    <Link to="/login" className='nav-buttons'>Login</Link>
                  </button>
                  <button className='signbutton'>
                    <Link to="/signIn" className='nav-buttons'>Sign Up</Link>
                  </button>
                </div>
              ):(
                <div>
                  <button className='accountButton'>
                    <VscAccount style={{fontSize: 24}}/>
                  </button>
                </div>
              )}

              
            </ul>
          </div>
        </nav>
    </div>
  )
}

export default Navbar