const path = require('path');
const http = require('http');
const express = require('express');
const passport = require('passport')
const hbs = require('hbs');
const { connectDB, port } = require('./loaders/loaders');
const chatServer = require('./chatserver');

require('./config/passport')(passport);

const app = express();
const server = http.createServer(app);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.get("/", (req, res) => res.render('login'));
app.get("/chat", (req, res) => {
    if (req.app.get('user') == '') return res.redirect('/')
    const roomName = 'Lobby';
    const user = req.app.get('user');
    req.app.set('user', '');
    res.render('chat', { room : roomName, user : JSON.stringify(user) })
});

app.use('/auth', require('./routes/auth'));

(async () => {
    await connectDB();
    server.listen(port, () => console.log(`Chat Server running...on port ${port}`));
    chatServer.listen(server)
})();
