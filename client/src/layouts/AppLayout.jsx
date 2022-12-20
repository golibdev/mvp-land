import React, {useEffect, useState} from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Header } from '../components/Header/Header'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { isAuthenticated } from '../handlers/auth'

export const AppLayout = () => {
   const path = useLocation().pathname;
   const role = localStorage.getItem('role')
   const navigate = useNavigate()
   const [toggle, setToggle] = useState(false)

   useEffect(() => {
      const redirectAdminPanel = () => {
         const token = localStorage.getItem('token');
         const isAuth = isAuthenticated(token)
         if (!isAuth) return navigate('/')
      }
      redirectAdminPanel()
   }, [])

   useEffect(() => {
      if((path == '/admin' || path === '/admin/users') && role !== 'admin') {
         return navigate('/admin/lands')
      }
   }, [role])

   const clickToggle = () => {
      setToggle(!toggle)
   }
   
   return (
      <>
         <Header clickToggle={clickToggle} />
         <Sidebar clickToggle={clickToggle} toggle={toggle} />
         <main id='main' className={'main'} style={{ marginLeft: toggle && '0' }}>
            <Outlet />
            <ToastContainer/>
         </main>
      </>
   )
}