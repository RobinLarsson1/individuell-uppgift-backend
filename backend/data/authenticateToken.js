import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next) {
  let token = req.headers?.authorization;
  const secret = process.env.SECRET || 'petdogs';
  token = token.trim();

  if (!token) {
    console.log('!token, inside auth-middleware');
    return res.sendStatus(400);
  }

  jwt.verify(token, secret, (err, user) => {
    console.log(user);
    if (err) {
      console.log(err);
      return res.sendStatus(400);
    }

    req.user = user;
    next();
  });
}

export default authenticateToken;