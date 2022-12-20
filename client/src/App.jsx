import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { Users } from './pages/Users'
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'
import { Profile } from './pages/Profile'
import { Lands } from './pages/Lands'
import { Register } from './pages/Register'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path='/admin' element={<AppLayout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='/admin/users' element={<Users/>}/>
          <Route path='/admin/profile' element={<Profile/>}/>
          <Route path='/admin/lands' element={<Lands/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
