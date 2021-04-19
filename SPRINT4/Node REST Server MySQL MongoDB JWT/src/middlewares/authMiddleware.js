const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if(typeof authHeader !== 'undefined') {
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401);
        jwt.verify(token, 'top secret word key', (err, authData) => {
            //console.log(err.message);
            if (err) return res.sendStatus(401);
            req.authData = authData;
            next()
        })
    } else res.sendStatus(403);
}

module.exports = authenticateToken;