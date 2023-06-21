// function authenticateToken(req, res, next) {
// 	const token = req.headers.authorization?.split(' ')[1];
// 	const channelId = Number(req.params.id);
  
// 	const channel = db.data.channels.find((c) => c.id === channelId);
  
// 	if (channel && channel.locked === 'true') {
// 	  // Kontrollera JWT-token endast för låsta kanaler
// 	  if (!token) return res.sendStatus(401);
  
// 	  jwt.verify(token, secret, (err, user) => {
// 		if (err) return res.sendStatus(403);
  
// 		req.user = user;
// 		next();
// 	  });
// 	} else {
// 	  // För öppna kanaler eller kanaler som inte finns
// 	  next();
// 	}
//   }