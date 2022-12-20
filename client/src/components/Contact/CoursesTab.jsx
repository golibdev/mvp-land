import React, { useState } from 'react'
import Select from 'react-select'
import { toast } from 'react-toastify'
import { studentApi } from '../../api/studentApi'

export const CoursesTab = ({ courses }) => {
   const [fullName, setFullName] = useState('')
   const [phone, setPhone] = useState('')
   const [phoneNumber, setPhoneNumber] = useState('')
   const [courseId, setCourseId] = useState('')

   const options = courses.map(item => ({
      value: item._id,
      label: item.title
   }))

   const handleChange = (e) => {
      var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})(\d{0,2})/); 
      setPhone(!x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '') + (x[4] ? '-' + x[4] : ''))
      setPhoneNumber(x.input);
   }

   const handleRegister = async (e) => {
      e.preventDefault();

      const check = {
         fullName: fullName.trim().length === 0,
         phoneNumber: phoneNumber.trim().length === 0,
         courseId: courseId.trim().length === 0
      }

      if(check.fullName || check.courseId || check.phoneNumber) {
         return toast.warn("Barcha maydonlarni to'ldiring!")
      }

      const params = {
         fullName,
         phoneNumber,
         courseId
      }
      try {
         const res = await studentApi.register(params)
         toast.success(res.data.message)
         setPhone('')
         setPhoneNumber('')
         setFullName('')
         setCourseId('')
      } catch (err) {
         toast.error(err.response.data.message)
      }
   }
   return (
      <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="0">
         <div className="mb-3">
            <label htmlFor="fullName" className='mb-3 card-title p-0'>Ism familiya sharifingiz</label>
            <input 
               type="text" 
               className="form-control" 
               id="fullName"
               placeholder='F.I.SH'
               value={fullName}
               onChange={e => setFullName(e.target.value)}
            />
         </div>
         <div className="mb-3">
            <label htmlFor="fullName" className='mb-3 card-title p-0'>Telefon raqamingiz</label>
            <input 
               type="text" 
               className="form-control" 
               id="fullName"
               placeholder='901234567'
               value={phone}
               onChange={handleChange}
            />
         </div>
         <div className='mb-3'>
            <label htmlFor='category' className='mb-3 card-title p-0'>Kursni tanlang</label>
            <Select
               options={options}
               isOptionSelected
               className='card-title pt-0 pb-0'
               onChange={e => setCourseId(e.value)}
            />
         </div>
         <div>
            <button onClick={handleRegister} className='btn btn-primary'>
               Jo'natish
            </button>
         </div>
      </div>
   )
}
