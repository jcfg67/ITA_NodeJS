const socketio = require('socket.io');
const services = require('./services/mysqlservices');

exports.listen = (server) => {
    (async () => await services.deleteAllUsers())();
    const io = socketio(server);

    io.on('connection', (socket) => {

        socket.on('newUser', async (room, username ) => {
            await services.createUser(room, username, socket.id);
            socket.join(room);
            socket.broadcast.to(room).emit('userConnected', username);
            const users = await services.getRoomUsers();
            io.to(room).emit('roomUsers', users);
            const rooms = await services.getRooms();
            io.to(room).emit('chatRooms', rooms);
            const messages = await services.getMessages(room);
            // io.to(room).emit('roomMessages', messages)
            socket.emit('roomMessages', messages)
        });

        socket.on('sentChatMessage', async (room, username, message) => {
            const formattedMessage = `${username}: ${message}`;
            await services.saveMessage(room, formattedMessage);
            socket.broadcast.to(room).emit('chatMessage', formattedMessage)
        });

        socket.on('newRoom', async (newroom) => {
            const newRoomId = await services.createRoom(newroom);
            if (newRoomId) {
                socket.emit('roomCreated', newroom);
            }
        });

        socket.on('changeRoom', async function(newRoom, username, oldRoom) {
            await services.updateUser(newRoom, socket.id);
            socket.join(newRoom);
            socket.leave(oldRoom);
            socket.broadcast.to(newRoom).emit('userConnected', username);
            socket.broadcast.to(oldRoom).emit('userDisconnected', username);
            const users = await services.getRoomUsers();
            io.emit('roomUsers', users);
            const rooms = await services.getRooms();
            io.emit('chatRooms', rooms)
            const messages = await services.getMessages(newRoom);
            // io.to(newRoom).emit('roomMessages', messages)
            socket.emit('roomMessages', messages)
        });
        
        socket.on('disconnect', async function() {
            const { room, username } = await services.getUserRoom(socket.id);
            if (!room || !username) return;
            await services.deleteUser(socket.id);
            io.to(room).emit('chatMessage', `${username} has left the chat`);
            const users = await services.getRoomUsers();
            io.to(room).emit('roomUsers', users);
        });
    });
}

