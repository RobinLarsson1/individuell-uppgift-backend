import { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import Users from './components/Users'
import Channels from './components/Channels'
import Message from './components/Messages'


function App() {
 
  

  return (
    <div>
      <Login />
      <hr />
        <Channels />
        <br />
        {/* <Message /> */}
        <Users />
      </div>
  )
}

export default App


