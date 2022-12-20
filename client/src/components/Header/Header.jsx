import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../handlers/auth'

export const Header = ({clickToggle}) => {
   const navigate = useNavigate()
   const fullName = localStorage.getItem('fullName')
   return (
      <header id="header" className="header fixed-top d-flex align-items-center">

         <div className="d-flex align-items-center justify-content-between">
            <Link to="/admin" className="logo d-flex align-items-center">
               <h3>Dashboard</h3>
            </Link>
         </div>

         <nav className="header-nav ms-auto d-flex align-items-center">
            <i className="fas fa-bars toggle-sidebar-btn text-primary" style={{ fontSize: '25px' }} onClick={clickToggle}></i>
            <ul className="d-flex align-items-center">

               <li className="nav-item dropdown pe-3">

                  <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                     <i className="fas fa-user-circle fs-2"></i>
                     <span className="d-none d-md-block dropdown-toggle ps-2">{fullName}</span>
                  </a>

                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                     <li style={{ cursor: 'pointer' }}>
                        <Link className="dropdown-item d-flex align-items-center" to={'/admin/profile'}>
                           <i className="fas fa-cog"></i>
                           <span>Sozlamalar</span>
                        </Link>
                     </li>
                     <li style={{ cursor: 'pointer' }}>
                        <a className="dropdown-item d-flex align-items-center" onClick={() => {
                           logout(navigate)
                        }}>
                           <i className="fas fa-arrow-left"></i>
                           <span>Chiqish</span>
                        </a>
                     </li>

                  </ul>
               </li>

            </ul>
         </nav>

      </header>
   )
}