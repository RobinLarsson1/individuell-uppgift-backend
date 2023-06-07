import express from 'express';
import { getDb } from '../data/database.js';
import jwt from 'jsonwebtoken';


const router = express.Router();
const db = getDb();

const secret = process.env.SECRET || 'petdogs'


router.get('/', async (req, res) => {
    let authHeader = req.headers.authorization;
    console.log('Secret1:', authHeader);
	if( !authHeader ) {
		res.status(401).send({
			message: 'du måste vara inloggad'})
		return
	}
	let token = authHeader.replace('Bearer ', '')

	try {
		let decoded = jwt.verify(token, secret)
		console.log('GET /secret decoded: ', decoded)
		res.send({
			message: 'This is secret data. Bc you are authenticaded'
		})

	} catch(error) {
		console.log('GET /secret error: ' + error.message)
		res.sendStatus(401)
	}

    // if (authHeader) {

    //     res.send('Success');
    // } else {
    //     res.send('Fail');
    // }
});

export default router;