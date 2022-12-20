import React, { useState, useEffect } from 'react'
import { PageTitle } from '../components/PageTitle/PageTitle'
import { authApi } from '../api/authApi'
import { Loader } from '../components/Loader/Loader'
import moment from 'moment'
import { toast } from 'react-toastify'

export const Users = () => {
   const [users, setUsers] = useState([])
   const [loading, setLoading] = useState(false);

   const getAllUsers = async () => {
      try {
         const res = await authApi.getAll();
         setUsers(res.data.admins)
         setLoading(true)
      } catch (err) {}
   }

   useEffect(() => {
      getAllUsers();
   }, [])
   return (
      loading ? (
         <>
            <div className="card">
               <div className="card-body pb-0 d-flex align-items-center justify-content-between">
                  <PageTitle title={'Foydalanuvchilar'} />
               </div>
            </div>
            <div className="card">
               <div className="card-body pt-4">
                  {users.length > 0 ? <UsersList users={users} /> : (
                     <h4 className='text-center mb-0 text-danger fw-bold'>
                        Yerlar mavjud emas
                     </h4>
                  )}
               </div>
            </div>
         </>
      ) : (
         <Loader/>
      )
   )
}

const UsersList = ({ users }) => {
   return (
      <div className='table-responsive '>
         <table className='table table-striped table-hover table-bordered'>
            <tbody>
               <tr className='text-center'>
                  <th>#</th>
                  <th>FullName</th>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Yerlar soni</th>
                  <th>Yaratilgan vaqti</th>
               </tr>
               {users.map((user, index) => (
                  <tr key={user._id}>
                     <th className='text-center'>{index + 1}</th>
                     <td className='text-center'>{user.fullName}</td>
                     <td className='text-center'>{user.username}</td>
                     <td className='text-center'>{user.role}</td>
                     <td className='text-center'>{user.areas.length}</td>
                     <td className='text-center'>{moment(user.createdAt).format('DD.MM.YYYY HH:mm')}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   )
}