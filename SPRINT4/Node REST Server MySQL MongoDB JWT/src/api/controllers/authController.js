const jwt = require('jsonwebtoken');

const authorizedUser = {
    name : "Jonatan",
    passw : "Pa33w0rd!"
}

const maxAge = 30 * 60;
const createToken = data => jwt.sign(data, 'top secret word key', { expiresIn: maxAge });

const postLogin = (req, res) => {
    const { name, passw } = {...req.body};
    if (name != authorizedUser.name) return res.status(404).json({success: false, message: "User not found"});
    if (passw != authorizedUser.passw) return res.status(401).json({success: false, message: "Authorization failed"});
    const token = createToken({user: authorizedUser.name, role: 'admin'});
    res.json({ token })
}

module.exports = postLogin;
