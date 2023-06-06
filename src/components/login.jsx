import { useState, useEffect } from 'react'


const sessionStorageKey = 'jwt-example'

const handleLogin = async () => {
	    // förbereda request: body, options
		// skicka request
		// hantera svaret

		let body = { username, password }
		let options = {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		}
}

const handleLogout = async () => {
	sessionStorage.removeItem(sessionStorageKey)
	setIsLoggedIn(false)
}


const Login = () => {
	const [isLoggedIn, setIsLoggedIn] = useState('false')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		if( sessionStorage.getItem(sessionStorageKey) ) {
			setIsLoggedIn(true)
		}
	}, [])


	return (
		<section className="login-section">
			<h2>Logga in</h2>
		<input type="text" placeholder='User-name' onChange={e => setUsername(e.target.value)}
		value={username}/>
		<input type="password" placeholder='Password' onChange={e => setPassword(e.target.value)}
		value={password}/>
		<button type='button' onClick={handleLogin}>Logga in</button>
		</section>
	)
}

export default Login