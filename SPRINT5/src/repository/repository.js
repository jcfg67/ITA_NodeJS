const { getConnection } = require('typeorm');
const User = require('../models/User');
const Room = require('../models/Room');
const Message = require('../models/Message');


// const connection = getConnection();
// const userRepository = connection.getRepository(User);


const createRoom = async (room) => {
    const connection = getConnection();
    const roomRepository = connection.getRepository(Room);
    const foundRoom = await roomRepository.find({ name: room });
    if (foundRoom.length != 0) return { created: false, room: foundRoom[0] };
    const newRoom = new Room();
    newRoom.name = room;
    savedRoom = await roomRepository.save(newRoom);
    return { created: true, room: savedRoom }
}

const createUser = async (room, user, socketId) => {
    const connection = getConnection();
    const userRepository = connection.getRepository(User);
    const createdRoom = await createRoom(room)
    let readUser = await userRepository.findOne({ googleId: user.googleId });
    if (readUser) {
        readUser.room = createdRoom.room;
        readUser.socketId = socketId;
        await userRepository.save(readUser);
    } else {
        user.room = createdRoom.room;
        user.socketId = socketId;
        await userRepository.save(user);
    }
}

const getUsers = async () => {
    const connection = getConnection();
    const users = await connection.getRepository(User).
        find({ relations: ["room"] });
    return users
}

const getRooms = async () => {
    const rooms = await getConnection().getRepository(Room).find();
    return rooms
}

const saveMessage = async (room, message )=> {
    const foundRoom = await getConnection().
        getRepository(Room).find({ name: room});
    const newMessage = new Message();
    newMessage.content = message;
    newMessage.room = foundRoom[0];
    await getConnection().getRepository(Message).save(newMessage)
}

const getMessages = async (roomName) => {
    const messages = await getConnection().getRepository(Message).
        createQueryBuilder('message').
        leftJoinAndSelect('message.room','room').
        where('room.name = :name', { name: roomName}).getMany();
    return messages
}

const updateUser = async (roomName, socketId) => {
    const connection = getConnection();
    const room = await connection.getRepository(Room).
        find({ name: roomName});
    const foundUser = await connection.getRepository(User).
        find({ socketId });
    const user = foundUser[0];
    user.room = room[0];
    await connection.getRepository(User).save(user)
}

const getUserRoom = async (socket_Id) => {
    const connection = getConnection();
    const foundUser = await connection.getRepository(User).
        find({ relations: ["room"], where : { socketId : socket_Id } } );
    if (foundUser.length == 0) return {room: '', username: ''};
    const user = foundUser[0];
    return { room: user.room.name, username: user.name }
}

const deleteUser = async (socket_Id) => {
    const connection = getConnection();
    const foundUser = await connection.getRepository(User).
        find({ relations: ["room"], where : { socketId : socket_Id } } );
    const user = foundUser[0];
    user.socketId = '';
    user.room = null;
    await connection.getRepository(User).save(user)
}

module.exports = {
    createRoom,
    createUser,
    getUserRoom,
    updateUser,
    deleteUser,
    getRooms,
    getUsers,
    saveMessage,
    getMessages
}
