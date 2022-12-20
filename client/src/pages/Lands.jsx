import React, { useState, useEffect } from 'react'
import { PageTitle } from '../components/PageTitle/PageTitle'
import { landApi } from '../api/landApi'
import { Loader } from '../components/Loader/Loader'
import moment from 'moment'
import { toast } from 'react-toastify'

export const Lands = () => {
   const role = localStorage.getItem('role')
   const [lands, setLands] = useState([])
   const [loading, setLoading] = useState(false);

   const getAllLands = async () => {
      try {
         const res = await landApi.getAll()
         setLands(res.data.lands);
         setLoading(true)
      } catch (err) {}
   }

   useEffect(() => {
      getAllLands();
   }, [])
   return (
      loading ? (
         <>
            <div className="card">
               <div className="card-body pb-0 d-flex align-items-center justify-content-between">
                  <PageTitle title={'Yerlar'} />
                  {role === 'user' && <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#create">
                     <i className='fas fa-plus-circle'></i>
                  </button>}
               </div>
            </div>
            <CreateLand />
            <div className="card">
               <div className="card-body pt-4">
                  {lands.length > 0 ? <LandsList lands={lands} role={role} /> : (
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

const LandsList = ({ role, lands }) => {
   return (
      <div className='table-responsive '>
         <table className='table table-striped table-hover table-bordered'>
            <tbody>
               <tr className='text-center'>
                  <th>#</th>
                  <th>Yer o'lchami</th>
                  <th>Yer egasi</th>
                  <th>Yaratilgan vaqti</th>
                  {role === 'user' && <th>Tahrirlash</th>}
               </tr>
               {lands.map((land, index) => (
                  <tr key={index}>
                     <th className='text-center'>{index + 1}</th>
                     <td className='text-center'>{land.area} ga</td>
                     <td className='text-center'>{land.user.fullName}</td>
                     <td className='text-center'>{moment(land.createdAt).format('DD.MM.YYYY HH:mm')}</td>
                     {role === 'user' && <td>
                        <div className='text-center'>
                           <button className='btn btn-warning text-white' data-bs-toggle="modal" data-bs-target={`#edit${land._id}`}>
                           <i className='fas fa-edit'></i>
                        </button>
                        </div>
                        <UpdateService id={land._id} land={land} />
                     </td>}
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   )
}

const CreateLand = () => {
   const [area, setArea] = useState('')
   const [resultProducts, setResultProducts] = useState('')
   const [numberPlan, setNumberPlan] = useState('')

   const handleSubmit = async (e) => {
      e.preventDefault()
      
      const check = {
         area: area.trim().length === 0,
         resultProducts: resultProducts.trim().length === 0,
         numberPlan: numberPlan.trim().length === 0
      }

      if (check.area || check.numberPlan || check.resultProducts) {
         toast.error('Barcha maydolarni to\'ldiring!')
         return
      }

      const params = {
         area,
         numberPlan: +numberPlan,
         resultProducts
      }

      try {
         const res = await landApi.create(params)
         toast.success(res.data.message)
         setTimeout(() => {
            window.location.reload()
         }, 1000);
      } catch (err) {
         console.log(err.response);
      }
   }
   return (
      <div className="modal fade" id="create"  tabIndex="-1" aria-hidden="true">
         <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
               <div className="modal-header">
                  <h5 className="modal-title card-title pb-0 pt-0">Yer qo'shish</h5>
                  <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
               </div>
               <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                     <div className="col-12">
                     <div className='mb-3'>
                           <label htmlFor="area" className='card-title m-0 pt-0 card-title'>Yer o'lchami</label>
                           <input 
                              type="number"
                              className='form-control' 
                              id="area" 
                              placeholder="Yer o'lchami" 
                              value={area} 
                              onChange={e => setArea(e.target.value)}
                           />
                        </div>
                        <div className='mb-3'>
                           <label htmlFor="resultProducts" className='card-title m-0 pt-0 card-title'>Olingan maxsulot (tonna xisobida)</label>
                           <input 
                              type="text"
                              className='form-control'
                              placeholder='Olingan maxsulot' 
                              value={resultProducts} 
                              onChange={e => setResultProducts(e.target.value)} 
                              id="resultProducts"
                           />
                        </div>
                        <div className='mb-3'>
                           <label htmlFor="numberPlan" className='card-title m-0 pt-0 card-title'>Nechanchi ekin</label>
                           <select value={numberPlan} onChange={e=>setNumberPlan(e.target.value)} id="numberPlan" className='form-select'>
                              <option value="">Tanlang</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                           </select>
                        </div>
                     </div>
                     <div className='col-12'>
                        <button className='btn btn-primary'>
                           <i className='fas fa-plus'></i>
                        </button>
                     </div>
                  </form>
               </div>
               <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
               </div>
            </div>
         </div>
      </div>
   )
}

const UpdateService = ({ id, land }) => {
   const [area, setArea] = useState(land.area)
   const [resultProducts, setResultProducts] = useState(land.resultProducts)
   const [numberPlan, setNumberPlan] = useState(land.numberPlan)


   const handleUpdate = async (e) => {
      e.preventDefault()

      const params = {
         area,
         numberPlan: +numberPlan,
         resultProducts
      }
      try {
         const res = await landApi.update(id, params)
         toast.success(res.data.message)

         setTimeout(() => {
            window.location.reload()
         }, 1000);
      } catch (err) {
         toast.error(err.response.data.message)
      }
   }

   return (
      <div className="modal fade" id={`edit${id}`}  tabIndex="-1" aria-hidden="true">
         <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
               <div className="modal-header">
                  <h5 className="modal-title card-title pb-0 pt-0">Yer ma'lumotlarini tahrirlash</h5>
                  <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
               </div>
               <div className="modal-body">
                  <form onSubmit={handleUpdate}>
                     <div className="col-12">
                     <div className='mb-3'>
                           <label htmlFor="area" className='card-title m-0 pt-0 card-title'>Yer o'lchami</label>
                           <input 
                              type="number"
                              className='form-control' 
                              id="area" 
                              placeholder="Yer o'lchami" 
                              value={area} 
                              onChange={e => setArea(e.target.value)}
                           />
                        </div>
                        <div className='mb-3'>
                           <label htmlFor="resultProducts" className='card-title m-0 pt-0 card-title'>Olingan maxsulot (tonna xisobida)</label>
                           <input 
                              type="text"
                              className='form-control'
                              placeholder='Olingan maxsulot' 
                              value={resultProducts} 
                              onChange={e => setResultProducts(e.target.value)} 
                              id="resultProducts"
                           />
                        </div>
                        <div className='mb-3'>
                           <label htmlFor="numberPlan" className='card-title m-0 pt-0 card-title'>Nechanchi ekin</label>
                           <select value={numberPlan} onChange={e=>setNumberPlan(e.target.value)} id="numberPlan" className='form-select'>
                              <option value="">Tanlang</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                           </select>
                        </div>
                     </div>
                     <div className='col-12'>
                        <button className='btn btn-success'>
                           <i className='fas fa-save'></i>
                        </button>
                     </div>
                  </form>
               </div>
               <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
               </div>
            </div>
         </div>
      </div>
   )
} 