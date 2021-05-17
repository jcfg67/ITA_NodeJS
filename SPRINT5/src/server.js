const path = require('path');
const http = require('http');
const express = require('express');
const hbs = require('hbs');
const { connectDB, port } = require('./loaders/loaders');
const postLogin = require('./controllers/chatController');
const chatServer = require('./chatserver');

const app = express();
const server = http.createServer(app);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.render('login'));
app.post('/', postLogin);

(async () => {
    await connectDB();
    server.listen(port, () => console.log(`Chat Server running...on port ${port}`));
    chatServer.listen(server)
})();
