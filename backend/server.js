import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import usersRouter from './routes/users.js'
import channelsRouter from './routes/channels.js'
import messagesRouter from './routes/messages.js'
import cors from 'cors'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import jwt from 'jsonwebtoken';
import { getDb } from './data/database.js'



const { sign } = jwt;

// Konfigurera server
const port = process.env.PORT || 3877
const app = express()
const secret = process.env.SECRET || 'petdogs'
const db = getDb()

app.use(cors())
app.use(express.json());  // gör så att vi kan använda req.body
app.use((req, res, next) => {
	
	next();
});


const __dirname = dirname(fileURLToPath(import.meta.url))
const pathToStaticFolder = join(__dirname, '../dist')
app.use(express.static(pathToStaticFolder))




app.use('/api/users', usersRouter)
app.use('/api/channels', channelsRouter)
app.use('/api/messages', messagesRouter)
// app.use('/api/login', loginRouter)
// app.use('/api/secret', secretRouter)

// app.use('/api/users', usersRouter)
// app.use('/api/search', searchRouter)


app.get('/public', (req, res) => {
	res.send({
		message: 'Detta är publik info'
	})
})

app.post('/login', async (req, res) => {
	if (!req.body || !req.body.username || !req.body.password) {
		res.sendStatus(400);
		return;
	}

	const { username, password } = req.body;

	await db.read();
	const user = db.data.users.find((user) => user.username === username && user.password === password
	);

	if (!user) {
		console.log('fel inloggningsuppgifter')
		res.sendStatus(401);
		return;
	}
	const hour = 60 * 60
	const payload = { userId: user.id, username: user.username };
	const options = { expiresIn: 2 * hour }
	let token = jwt.sign(payload, secret, options);
	console.log('signed JWT: ', token)
	let tokenPackage = { token: token }
	res.send(tokenPackage);
});



/// GET /secret
app.get('/secret', (req, res) => {
	let authHeader = req.headers.authorization
	// console.log('Secret 1: ', authHeader)
	if( !authHeader ) {
		res.status(401).send({
			message: 'You must be authenticated to view this very secret data.'
		})
		return
	}
	let token = authHeader.replace('Bearer: ', '')

	try {
		let decoded = jwt.verify(token, secret)
		console.log('GET /secret decoded: ', decoded)
		let userId = decoded.userId
		let user = user.find(u => u.id === userId)
		console.log(`User "${user.username}" has access to secret data.`)
		// Vi kan hämta info om användaren med hjälp av userId
		
		res.send({
			message: 'This is secret data. Because you are authenticated.'
		})

	} catch(error) {
		console.log('GET /secret error: ' + error.message)
		res.sendStatus(401)
	}
})



// starta
app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)

})