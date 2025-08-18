import React from "react";
import { Link } from "react-router-dom";
import logo from '../images/logo.png'
import './navbar.css'

function Navbar(){
    return(
        <nav className="navbar">
            <div className="logo">
                <img
                src={logo}
                alt="logo"
                />
            </div>
            <div className="links">
                <Link to='/productlist'>Products</Link>
                <Link to='/'>login</Link>
                <Link to='/cart'>🛒</Link>

            </div>
        </nav>
    )
}

export default Navbar;