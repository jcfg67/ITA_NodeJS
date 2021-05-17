const socketio = require('socket.io');
const repository = require('./repository/repository');

// exports.listen = (server) => {
module.exports = (server) => {
    const io = socketio(server);

    io.on('connection', (socket) => {

        socket.on('newUser', async (room, user ) => {
            await repository.createUser(room, user, socket.id);
            socket.join(room);
            socket.broadcast.to(room).emit('userConnected', user.name);
            const users = await repository.getUsers();
            io.to(room).emit('roomUsers', users);
            const rooms = await repository.getRooms();
            io.to(room).emit('chatRooms', rooms);
            const messages = await repository.getMessages(room);
            socket.emit('roomMessages', messages)
        });

        socket.on('sentChatMessage', async (room, username, message) => {
            const formattedMessage = `${username}: ${message}`;
            await repository.saveMessage(room, formattedMessage);
            socket.broadcast.to(room).emit('chatMessage', formattedMessage)
        });

        socket.on('newRoom', async (newRoomName) => {
            const result = await repository.createRoom(newRoomName);
            const newRoom = result.room;
                socket.emit('roomCreated', newRoom.name);
        });

        socket.on('changeRoom', async function(newRoom, username, oldRoom) {
            await repository.updateUser(newRoom, socket.id);
            socket.join(newRoom);
            socket.leave(oldRoom);
            socket.broadcast.to(newRoom).emit('userConnected', username);
            socket.broadcast.to(oldRoom).emit('userDisconnected', username);
            const users = await repository.getUsers();
            io.emit('roomUsers', users);
            const rooms = await repository.getRooms();
            io.emit('chatRooms', rooms)
            const messages = await repository.getMessages(newRoom);
            socket.emit('roomMessages', messages)
        });
        
        socket.on('disconnect', async function() {
            const { room, username } = await repository.getUserRoom(socket.id);
            if (!room || !username) return;
            await repository.deleteUser(socket.id);
            io.to(room).emit('chatMessage', `${username} has left the chat`);
            const users = await repository.getUsers();
            io.to(room).emit('roomUsers', users);
        });
    });
}

