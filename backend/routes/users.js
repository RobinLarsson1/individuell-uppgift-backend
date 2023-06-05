import express from 'express'
import { getDb } from '../data/database.js'
import { isValidUser } from '../data/constants.js'

const router = express.Router()
const db = getDb() 


///GET
router.get('/', async (req, res) => {
	await db.read()
	res.send(db.data.users)
})


///GET FRÅN ID
router.get('/:id', async (req, res) => {
    let id = Number(req.params.id);

    if (!isNaN(id)) {
        await db.read();
        const user = db.data.users.find((p) => p.id === id);
        if (user) {
            res.send(user);
        } else {
            res.status(404).send('User not found.');
        }
    } else {
        res.status(400).send('Invalid id.');
    }
});


///GET LÄGG TILL USER
router.post('/', async (req, res) => {
    let addUser = req.body

    await db.read()
    addUser.id = Math.floor(Math.random() * 100000)
    db.data.users.push(addUser)
    await db.write()
    res.send({ id: addUser.id })
})





///DELETE USER
router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id) || id < 0) {
        res.sendStatus(400);
        return;
    }
    await db.read();
    const index = db.data.users.findIndex(user => user.id === id);
    if (index === -1) {
        res.sendStatus(404);
        return;
    }

    db.data.users.splice(index, 1);
    await db.write();

    res.sendStatus(200);
});


router.put('/:id', async (req, res) => {
    const id = Number(req.params.id)

    if(!isValidUser(req.body)) {
        res.sendStatus(400)
        return
    }

    await db.read()
    const oldUserIndex = db.data.users.findIndex(user => user.id === id);
    if(oldUserIndex === -1) {
        res.sendStatus(404)
        return
    }

    const updatedUser = req.body
    updatedUser.id = id;

    db.data.users[oldUserIndex] = updatedUser
    await db.write()
    res.sendStatus(200);
})



export default router