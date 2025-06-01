import React from 'react'
import './index.css'
import { Link, withRouter } from 'react-router-dom';

import { IoIosSearch } from "react-icons/io";

const Header = () => {
  const onClickLoginOne = () => {

  }
  return (
    <nav>
        <div className='initial-header'>
            <div className='header-main-logo'>
              <div className='login-logo-max-cont'>
                        <h1 className='M'>M</h1>
                        <h1 className='A'>A</h1>
                        <h1 className='X'>X</h1>
                    </div>
              <h1 className='raid-header-logo'>Raid</h1>
            </div>
            <div className='header-input-search'>
              <input id="MainHeaderSearch" type='search' className='input-search-for-headers' placeholder='Search Here like - Oppo'/>
              <label className='search-input-header' htmlFor='MainHeaderSearch'><IoIosSearch className='search-icons-header'  /></label>
              
            </div>
            
            <div className='cart-button-header-cont'>
              <button className='cart-item-header'>Cart</button>
              <p className='count-of-cart-header'>0</p>
            </div>
            
            <Link to="/login">
            <button className='cart-item-header' onClick={onClickLoginOne}>Login / Sign Up</button>
            </Link>
        </div>
    </nav>
  )
}

export default Header
