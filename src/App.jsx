import { useState, useEffect } from 'react'
import { useRecoilState } from "recoil";
import './App.css'
import Login from './components/Login'
import Users from './components/Users'
import Channels from './components/Channels'
import Message from './components/Messages'
import AddUser from "./components/AddUser"
import { addNewUserState } from '../backend/data/recoil.js';


function App() {
  const [showAddUser, setShowAddUser] = useRecoilState(addNewUserState);
 
  

  return (
    <div>
      <Login setShowAddUser={setShowAddUser} />
        {showAddUser && <AddUser />}
        <Channels />
        
        <Users />
      </div>
  )
}

export default App


