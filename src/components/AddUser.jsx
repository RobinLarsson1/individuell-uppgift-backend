import { useRecoilState } from "recoil"
import { useState } from "react"
import { addNewUserState } from "../../backend/data/recoil"
import './styles/addUser.css'

const AddUser = () => {
	const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
	const [showForm, setShowForm] = useRecoilState(addNewUserState)


	const handleAddUser = async () => {
        try {
          const response = await fetch(`/api/users`, {
            method: 'POST',
            body: JSON.stringify({
              username: username,
              password: password
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
    
        } catch (error) {
          console.log('Could not post message: ' + error.message)
        }
        setShowForm(false)
        setUsername('')
        setPassword('')
      }


	  const handleClose = () => {
		setShowForm(false);
		setUsername('');
		setPassword('');
	  };

	return (
		<>
		{showForm && <div className="add-user-div" >
		<button className="close-btn" onClick={handleClose}>
            X
          </button>
		<h3>Add new user</h3>
		<input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
		<input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
		<button className="add-user-btn" onClick={handleAddUser}> Submit </button>
		</div> }
		</>
	)
}


export default AddUser