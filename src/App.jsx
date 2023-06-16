import { useState, useEffect } from 'react'
import { useRecoilState } from "recoil";
import './App.css'
import Channels from './components/Channels'
import Login from './components/login'
import { addNewUserState } from '../backend/data/recoil.js';


function App() {
  const [showAddUser, setShowAddUser] = useRecoilState(addNewUserState);
 
  

  return (
    <div>
      <Login setShowAddUser={setShowAddUser} />
        <Channels />

      </div>
  )
}

export default App


