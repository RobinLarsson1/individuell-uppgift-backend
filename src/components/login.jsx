import { useState, useEffect } from 'react'
import React from 'react';
import { useRecoilState } from "recoil"
import { isLoggedInState } from '../../backend/data/recoil';
import { addNewUserState } from '../../backend/data/recoil';
import './styles/login.css'

// import { getDb } from './data/database.js'



const Login = () => {
	const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState)
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showAddUser, setShowAddUser] = useRecoilState(addNewUserState);
	
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

				setIsLoggedIn({ isLoggedIn: true, username: username });
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


	const handleSignUp = () => {
		setShowAddUser(true);
	  };

	  useEffect(() => {
		if (localStorage.getItem(localStorageKey)) {
		  setIsLoggedIn(true);
		} else {
		  setIsLoggedIn(false); // Sätt inloggningsstatus till false om det inte finns en JWT-token i localStorage
		}
	  }, []);


	  useEffect(() => {
		const handleBeforeUnload = () => {
		  localStorage.removeItem(localStorageKey);
		};
	
		window.addEventListener('beforeunload', handleBeforeUnload);
	
		return () => {
		  window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	  }, []);
	

	return (
		<header className='chappy-header'>
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
						<button onClick={handleSignUp} >Sign up</button>
					</>
				)}
			</div>
		</header>


	);
};

export default Login;