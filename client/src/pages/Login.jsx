import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../api/authApi'
import { isAuthenticated } from '../handlers/auth'
import { toast, ToastContainer } from 'react-toastify'

export const Login = () => {
   const navigate = useNavigate()
   const passwordRef = useRef(null)
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   useEffect(() => {
      const redirectAdminPanel = () => {
         const token = localStorage.getItem('token');
         const isAuth = isAuthenticated(token)
         if (isAuth) return navigate('/admin')
      }
      redirectAdminPanel()
   }, [])

   const loginHandler = async (e) => {
      e.preventDefault()
      
      const check = {
         username: username.trim().length === 0,
         password: password.trim().length === 0
      }

      if(check.username || check.password) {
         toast.warning("Barcha maydonlar to'ldirilishi shart")
         return
      }

      const params = {
         username,
         password
      }

      try {
         const res = await authApi.login(params)
         if(res.status === 200) {
            localStorage.setItem('token', res.data.admin.token)
            localStorage.setItem('fullName', res.data.admin.fullName)
            localStorage.setItem('role', res.data.admin.role)
            window.location.reload()
         }
      } catch (err) {
         console.log(err);
         if(err.response === undefined) {
            toast.error('Internetga ulanmagan')
            return
         } else if(err.response.status === 400) {
            toast.error(err.response.data.message)
            return
         }
      }
   }

   const viewPass = (e) => {
      if(e.target.checked) {
         passwordRef.current.setAttribute('type', 'text')
      } else {
         passwordRef.current.setAttribute('type', 'password')
      }
   }
   
   return (
      <div className='d-flex align-items-center justify-content-center' id='login-container'>
         <div className="container">
            <div className="row">
               <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1 col-12">
                  <form onSubmit={loginHandler} className="card border-top border-5 border-primary">
                     <div className="card-header text-center">
                        <h4 className='form-control fw-bold'>Tizimga kirish</h4>
                     </div>
                     <div className="card-body">
                        <div className='mb-3'>
                           <label htmlFor="username" className='mb-2 fw-bold'>Foydalanuvchi nomi</label>
                           <input 
                              type="text" 
                              className='form-control' 
                              id='username' 
                              placeholder='Foydalanuvchi nomi...' 
                              autoComplete='off' 
                              value={username} 
                              onChange={e => setUsername(e.target.value)} 
                           />
                        </div>
                        <div className='mb-3'>
                           <label htmlFor="password" className='mb-2 fw-bold'>Parol</label>
                           <input 
                              type="password" 
                              className='form-control' 
                              id='password' 
                              placeholder='Parol...' 
                              autoComplete='off'
                              ref={passwordRef} 
                              value={password} 
                              onChange={e => setPassword(e.target.value)}
                           />
                        </div>
                        <div className="mb-3 form-check">
                           <input
                              onClick={viewPass} 
                              type="checkbox" 
                              className="form-check-input" 
                              id="viewPass"
                           />
                           <label className="form-check-label" htmlFor="viewPass">Parolni ko'rish</label>
                        </div>
                     </div>
                     <div className="card-footer">
                        <button className='btn btn-primary btn-block me-2'>Login</button>
                        <Link to={'/register'}>Ro'yxatdan o'tish</Link>
                     </div>
                  </form>
               </div>
            </div>
         </div>
         <ToastContainer/>
      </div>
   )
}