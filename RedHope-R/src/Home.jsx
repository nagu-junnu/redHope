import React from 'react'
import Headder from './Container/Headder'
import Body from './Container/Body'
import BloodGroup from './Container/BloodGroup'
import About from './Container/About'


const Home = () => {
  return (
    <div>
      <Headder/>
      <Body/>
      <BloodGroup/>
      <About/>
    </div>
  )
}

export default Home
