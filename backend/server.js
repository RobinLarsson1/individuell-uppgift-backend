import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import usersRouter from './routes/users.js'
import channelsRouter from './routes/channels.js'
import messagesRouter from './routes/messages.js'
// import loginRouter from './routes/login.js'
// import secretRouter from './routes/secret.js'
import cors from 'cors'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import jwt from 'jsonwebtoken';
import { getDb } from './data/database.js'
import authenticateToken from './data/authenticateToken.js'


const { sign } = jwt;

// Konfigurera server
const port = process.env.PORT || 3877
const app = express()
const secret = process.env.SECRET || 'petdogs'
const db = getDb()

app.use(cors())
app.use(express.json());  // gör så att vi kan använda req.body
app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`, req.body);
	console.log(req.headers.authorization);
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

	const payload = { userId: user.id, username: user.username };
	const token = jwt.sign(payload, secret);

	res.send({ token });
});



app.get('/secret', (req, res) => {
	let authHeader = req.headers.Authorization
	// let jwt = authHeader.replace('Bearer:', '')
	console.log('Secret 1:', authHeader) 

	res.send('Fail')
})



// starta
app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)

})