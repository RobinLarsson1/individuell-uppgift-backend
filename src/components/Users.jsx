import React, { useEffect, useState } from "react";
import { getUsers, addUser } from "../../backend/data/userFetch";
import AddUser from "./AddUser";
import "./styles/users.css";
import { isLoggedInState } from '../../backend/data/recoil';
import { useRecoilState } from "recoil";
import { AiOutlineDelete } from 'react-icons/ai';

function Users() {
  const [errorMessage, setErrorMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState)



  
  useEffect(() => {
    handleGetUsers();
  }, []);


  const handleGetUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
      console.log("Fel vid hämtning av users");
    }
  };



  const handleDeleteUser = async (userId) => {
    setErrorMessage("");
    try {
      const response = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
      if (response.status === 200) {
        // user successfully deleted
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } else if (response.status === 400) {
        // Invalid ID
        const errorText = await response.text();
        setErrorMessage(errorText);
      } else if (response.status === 404) {
        // user not found
        const errorText = await response.text();
        setErrorMessage(errorText);
      } else {
        // Other error occurred
        throw new Error('An error occurred while deleting the user');
      }
    } catch (error) {
      // Handle network or fetch error
      setErrorMessage(error.message);
      console.log('Error in removing user');
    }
  };



  const handleAddUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };




  return (
    <div>
      <AddUser handleAddUser={handleAddUser} />
      {isLoggedIn && (
        <div>
          <div>
            <section className="add-user-section">
            </section>
            <section className="show-user-section">
              <h3 className="user-h3">USERS:</h3>
              {users.map((user) => (
                <div className="user" key={user.id}>
                  <p className=""> {user.username}</p>
                  <AiOutlineDelete onClick={() => handleDeleteUser(user.id)}  className="delete-user"/>
                </div>
              ))}
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
