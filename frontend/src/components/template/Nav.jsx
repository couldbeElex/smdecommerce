import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
                <i className="fa fa-home"></i> Início
            </Link>
            <Link to="/crud">
                <i className="fa fa-database"></i> CRUD
            </Link>
            <Link to="/login">
                <i className="fa fa-user"></i> Login
            </Link>
        </nav>
    </aside>