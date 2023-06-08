// import express from 'express';
// import { getDb } from '../data/database.js';
// import jwt from 'jsonwebtoken';

// const router = express.Router();
// const db = getDb();
// const secret = process.env.SECRET || 'petdogs';

// router.get('/', async (req, res) => {
//   const authHeader = req.headers.authorization;
// 	console.log(secret)
//   if (!authHeader) {
//     res.status(401).send({ message: 'Du måste vara inloggad' });
//     return;
//   }

//   const token = authHeader.replace('Bearer ', '');

//   try {
//     const decoded = jwt.verify(token, secret);
//     console.log('GET /secret decoded:', decoded);
//     const userId = decoded.id;

//     await db.read();
//     const user = db.data.users.find((u) => u.id === userId);

//     if (!user) {
//       console.log('Användaren hittades inte');
//       res.sendStatus(401);
//       return;
//     }

//     console.log(`Användaren "${user.username}" har tillgång till hemlig data.`);
//     res.send({ message: 'Detta är hemlig data eftersom du är inloggad.' });

	
//   } catch (error) {
//     console.log('GET /secret error:', error.message);
//     res.sendStatus(401);
//   }
// });

// export default router;