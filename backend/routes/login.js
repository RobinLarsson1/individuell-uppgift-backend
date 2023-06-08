// import express from 'express'
// import dotenv from 'dotenv'
// import jwt from 'jsonwebtoken'
// import { getDb } from '../data/database.js'


// const secret = process.env.SECRET || 'petdogs'
// const router = express.Router()
// const db = getDb() 

// router.get('/public', (req, res) => {
//     res.send({
//         message: 'Publik information'})
// })



// router.post('/', async (req, res) => {
//   if( !req.body || !req.body.username || !req.body.password ) {
// 		res.sendStatus(400)
// 		return
// 	}
// 	const { username, password } = req.body

// 	let found = users.find(user => user.username === username)
// 	if( !found ) {
// 		console.log('- felaktigt användarnamn')
// 		res.sendStatus(401)
// 		return
// 	}
// 	if( found.password !== password ) {
// 		console.log('- felaktigt lösenord')
// 		res.sendStatus(401)
// 		return
// 	}

// 	// Lyckad inloggning! Skapa en JWT och skicka tillbaka
// 	// jwt.sign(payload, secretOrPrivateKey, [options, callback])
// 	const hour = 60 * 60
// 	const payload = { userId: found.id }
// 	const options = { expiresIn: 2 * hour }
// 	let token = jwt.sign(payload, secret, options)
// 	console.log('Signed JWT: ', token)
// 	let tokenPackage = { token: token }
// 	res.send(tokenPackage)
// })




// export default router
