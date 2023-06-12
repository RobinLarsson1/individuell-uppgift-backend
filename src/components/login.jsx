import { useState, useEffect } from 'react'
import React from 'react';
import { useRecoilState } from "recoil"
import { isLoggedInState } from '../../backend/data/recoil';

// import { getDb } from './data/database.js'



const Login = () => {
	const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState)
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	
	const localStorageKey = 'jwt-key'


	const handleLogout = async () => {
		localStorage.removeItem(localStorageKey)
		setIsLoggedIn(false)
	}
	const handleLogin = async () => {
		try {
			const response = await fetch('http://localhost:3877/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username, password })
			});

			if (response.ok) {
				const data = await response.json();
				const token = data.token;
				console.log('Received token:', token);
				

				// Spara JWT-token i localStorage
				localStorage.setItem(localStorageKey, token);

				setIsLoggedIn(true);
			} else {
				console.log('Fel inloggningsuppgifter');
				// Återställ användarnamn och lösenord
				setUsername('');
				setPassword('');
			}
		} catch (error) {
			console.error(error);
		}
	};


	useEffect(() => {
		if (localStorage.getItem(localStorageKey)) {
			setIsLoggedIn(true);
		}
	}, []);

	return (
		<header>
			<h1>Chappy</h1>
			<div className="user-status">
				{isLoggedIn ? (
					<>
						<span>Inloggad som {username}</span>
						<button onClick={handleLogout}>Logga ut</button>
					</>
				) : (
					<>
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder="användarnamn"
						/>
						<input
							type="password"
							value={password}
							placeholder="password"
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button type="button" onClick={handleLogin}>
							Logga in
						</button>
					</>
				)}
			</div>
		</header>

		//   <section className="login-section">
		// 	<h2>Logga in</h2>
		// 	<input
		// 	  type="text"
		// 	  placeholder="Användarnamn"
		// 	  onChange={(e) => setUsername(e.target.value)}
		// 	  value={username}
		// 	/>
		// 	<input
		// 	  type="password"
		// 	  placeholder="Lösenord"
		// 	  onChange={(e) => setPassword(e.target.value)}
		// 	  value={password}
		// 	/>
		// 	<button type="button" onClick={handleLogin}>
		// 	  Logga in
		// 	</button>
		//   </section>
	);
};

export default Login;