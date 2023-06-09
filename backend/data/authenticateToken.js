function authenticateToken(req, res, next) {
  let token = req.headers?.authorization;
  const secret = process.env.SECRET || 'petdogs';

  if (typeof token !== 'string') {
    console.log('Invalid token');
    return res.sendStatus(400);
  }

  token = token.trim().split(' ')[1];

  if (!token) {
    console.log('Missing token');
    return res.sendStatus(400);
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(401);
    }

    req.user = user;
    next();
  });
}
export default authenticateToken