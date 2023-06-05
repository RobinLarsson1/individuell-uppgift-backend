// Import
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import usersRouter from './routes/users.js'
import channelsRouter from './routes/channels.js'
import cors from 'cors'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'


// Konfigurera server
const port = process.env.PORT || 3877
const app = express()

app.use(cors())
app.use('/api', express.json())  // gör så att vi kan använda req.body
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.body);
    next()
})


const __dirname = dirname(fileURLToPath(import.meta.url))
const pathToStaticFolder = join(__dirname, '../dist')
app.use(express.static(pathToStaticFolder))


app.use('/api/users', usersRouter)
app.use('/api/channels', channelsRouter)
// app.use('/api/users', usersRouter)
// app.use('/api/search', searchRouter)



// starta
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
})