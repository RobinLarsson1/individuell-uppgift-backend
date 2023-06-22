import express from 'express'
import { getDb } from '../data/database.js'



const router = express.Router()
const db = getDb()


///GET
router.get('/', async (req, res) => {
	await db.read()
	res.send(db.data.messages)
})


router.get('/:id', async (req, res) => {
	let id = Number(req.params.id);

	if(!isNaN(id)) {
		await db.read()
		const message = db.data.messages.find((m) => m.id === id)
		if (message) {
			res.send(message)
		} else {
			res.status(404).send('Message not found')
		}
	} else {
		res.status(400).send('Invalid id')
	}
})


///POST MEDDELENADE 
router.post('/', async (req, res) => {
	let addMessage = req.body

	await db.read()
	addMessage.id = Math.floor(Math.random() * 1000000)
	db.data.messages.push(addMessage)
	await db.write()
	res.send({ id: addMessage.id })
	console.log('hata livet')
})


///DELETE MEDDELANDE 
router.delete('/:id', async (req, res) => {
	const id = Number(req.params.id);

	if (isNaN(id) || id < 0) {
		res.sendStatus(400)
		return;
	}
	await db.read();
	const index = db.data.messages.findIndex(message => message.id === id)
	if(index === -1) {
		res.sendStatus(404)
		return;
	}

	db.data.messages.splice(index, 1)
	await db.write()
	res.sendStatus(200)
})




export default router