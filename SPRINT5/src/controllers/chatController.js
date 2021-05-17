const postLogin = (req, res) => {
    username = req.body.username.trim();
    if (username == "") {
        return res.redirect('/')
    }
    roomName = 'Lobby';
    res.render('chat', { room : roomName, username : username })
};

module.exports = postLogin;
