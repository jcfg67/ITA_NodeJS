import path from 'path';
import http from 'http';
import express, { Request, Response } from 'express';
import passport from 'passport';
import hbs from 'hbs';
import { config } from './config/config';
import { createConnection } from 'typeorm';

const conf = require('../ormconfig.js');

createConnection(conf).then(() => {
    console.log('MYSQL DataBase connected using TypeORM')
}).catch(error => console.log(error));

import { passportConfig } from './config/passport';
passportConfig(passport);

const app = express();
const server = http.createServer(app);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.get("/", (req: Request, res: Response) => res.render('login'));
app.get("/chat", (req: Request, res: Response) => {
    if (req.app.get('user') == '') return res.redirect('/')
    const roomName = 'Lobby';
    const user = req.app.get('user');
    req.app.set('user', '');
    res.render('chat', { room : roomName, user : JSON.stringify(user) })
});

import {router} from './routes/auth'

app.use('/auth', router);

server.listen(5000, () => console.log(`Chat Server running...on port ${config.port}`));

import { chatServer } from './chatserver';
chatServer(server);


