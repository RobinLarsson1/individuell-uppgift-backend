import express from 'express'
import { getDb } from '../data/database.js'

const router = express.Router()
const db = getDb() 

///GET 
router.get('/', async (req, res) => {
	await db.read()
	res.send(db.data.channels)
})

///GET FRÅN ID
router.get('/:id', async (req, res) => {
    let id = Number(req.params.id);

    if (!isNaN(id)) {
        await db.read();
        const channel = db.data.channels.find((p) => p.id === id);
        if (channel) {
            res.send(channel);
        } else {
            res.status(404).send('Channel not found.');
        }
    } else {
        res.status(400).send('Invalid id.');
    }
});


///GET LÄGG TILL USER
router.post('/', async (req, res) => {
    let addChannel = req.body

    await db.read()
    addChannel.id = Math.floor(Math.random() * 100000)
    db.data.channels.push(addChannel)
    await db.write()
    res.send({ id: addChannel.id })
})


export default router