import React, { useState, useEffect } from 'react'
import { summaryApi } from '../api/summaryApi'
import { Loader } from '../components/Loader/Loader'
import { SummaryCard } from '../components/SummaryCard/SummaryCard'

export const Dashboard = () => {
   const [summary, setSummary] = useState({})
   const [loading, setLoading] = useState(false)

   const getSummaryData = async () => {
      try {
         const res = await summaryApi.getSummaryData()
         setSummary(res.data.summary)
         setLoading(true)
      } catch (err) {}
   }

   useEffect(() => {
      getSummaryData()
   }, [])
   return (
      loading ? (
         <div className='row'>
            <SummaryCard 
               title={"Foydalanuvchilar"}
               data={summary.users}
               icon={'fas fa-user'}
               color={'info'}
            />
            <SummaryCard 
               title={"Jami yerlar"}
               data={summary.landsCount}
               icon={'fas fa-landmark'}
               color={'primary'}
            />
            <SummaryCard 
               title={"Birinchi ekindagi yerlar"}
               data={summary.numberOnePlanLands}
               icon={'fa-solid fa-1'}
               color={'secondary'}
            />
            <SummaryCard 
               title={"Ikkinchi ekindagi yerlar"}
               data={summary.numberOnePlanLands}
               icon={'fa-solid fa-2'}
               color={'success'}
            />
         </div>
      ) : (
         <Loader/>
      )
   )
}
