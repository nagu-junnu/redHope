import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Home'
import Donate from './Donate'
import Need from './Need'
import Camp from './Camp'
import ContactPage from './ContactPage'
import PageNotFound from './PageNotFound'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Donate' element={<Donate/>}/>
      <Route path='/Need' element={<Need/>}/>
      <Route path='/Camp' element={<Camp/>}/>
      <Route path='/ContactPage' element={<ContactPage/> }/>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
