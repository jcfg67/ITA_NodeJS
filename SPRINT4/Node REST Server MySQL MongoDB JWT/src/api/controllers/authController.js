const jwt = require('jsonwebtoken');

const maxAge = 30 * 60;
const createToken = data => jwt.sign(data, 'top secret word key', { expiresIn: maxAge });

const postLogin = (req, res) => {
    const token = createToken({user: 'guess', name: 'Anonymous'});
    res.json({ token })
}

module.exports = postLogin;
