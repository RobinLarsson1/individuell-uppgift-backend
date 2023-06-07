import express from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { getDb } from '../data/database.js'


const secret = process.env.SECRET || 'petdogs'
const router = express.Router()
const db = getDb() 

router.get('/public', (req, res) => {
    res.send({
        message: 'Publik information'})
})



router.post('/', async (req, res) => {
  // Body-objektet innehåller användarnamn och lösenord
  // Validering av body
  if (!req.body || !req.body.username || !req.body.password) {
    res.sendStatus(400)
    return
  }

  const { username, password } = req.body

  // Läs databasen
  const dbInstance = await db.read() // Hämta databasinstanten

  const foundUser = db.data.users.find((u) => u.username === username)
  if (!foundUser) {
    console.log('Felaktigt användarnamn')
    res.sendStatus(401)
    return
  }

  if (foundUser.password !== password) {
    console.log('Felaktigt lösenord')
    res.sendStatus(401)
    return
  }

  // Inloggning lyckades: Skapa JWT och skicka tillbaka
  const hour = 60 * 60
  const token = jwt.sign({ username, id: foundUser.id }, secret, { expiresIn: 2 * hour })
  console.log('Signed JWT:', token)
  let tokenPackage = { token: token }
  res.send(tokenPackage)
})

export default router
