// Import
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import usersRouter from './routes/users.js'
import channelsRouter from './routes/channels.js'
import messagesRouter from './routes/messages.js'
import loginRouter from './routes/login.js'
import secretRouter from './routes/secret.js'
import cors from 'cors'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import jwt from 'jsonwebtoken'
import { getDb } from './data/database.js'


// Konfigurera server
const port = process.env.PORT || 3877
const app = express()
const secret = process.env.SECRET || 'petdogs'

app.use(cors())
app.use('/api', express.json())  // gör så att vi kan använda req.body
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
app.use('/api/login', loginRouter)
app.use('/api/secret', secretRouter)

// app.use('/api/users', usersRouter)
// app.use('/api/search', searchRouter)




// starta
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
   
})