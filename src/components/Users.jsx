import { useEffect, useState } from "react"
import { getUsers, deleteUser, addUser } from "../../backend/data/userFetch"
import './styles/users.css'

function Users() {
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState([])
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')

  useEffect(() => {
    handleGetUsers()
  }, [])


  const handleGetUsers = async () => {
    try {
      const data = await getUsers()
      setUser(data)
      setErrorMessage('')
    } catch (error) {
      setErrorMessage(error.message)
      console.log('Fel vid hämtning av users');
    }
  }

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId, setErrorMessage, setUser);
    } catch (error) {
      console.log(error);
    }
  };


  const handleSubmitUser = async (event) => {
    event.preventDefault();
    try {
      setUserName('');
      setUserPassword('')
      const newUser = { name: userName, password: userPassword, id: Math.random().toString() };
      await addUser(userName, userPassword, setErrorMessage, getChannels, newUser);
      setUser((prevUsers) => [...prevUsers, newUser]);
      console.log('user added');
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <div>
        <section className='add-user-section'>
          <form action="submit" className='add-user-form'>
          </form>
        </section>
        <section className='show-user-section'>
          <div><h3>[DM]:</h3></div>
          {user.map(user => (
            <div className='user' key={user.id}>
              <p> {user.username}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

export default Users


