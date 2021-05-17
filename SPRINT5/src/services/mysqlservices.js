const repository = require('../repository/mysqlrepository');

const createRoom = async (room) => {
    const roomId = await repository.queryRoom(room);
    if (!roomId) return await repository.sqlCreateRoom(room);
    return roomId
}

const createUser = async (room, username, socketId) => {
    const roomId = await createRoom(room);
    const result = await repository.sqlCreateUser(username, socketId,roomId);
}

const getUserRoom = async (socketId) => {
    const result = await repository.sqlgetUserRoom(socketId);
    return result
}

const updateUser = async (room, socketId) => {
    const result = await repository.sqlupdateUser(room, socketId);
}

const deleteUser = async (socketId) => {
    const result = await repository.sqldeleteUser(socketId);
    return result
}

const getRooms = async() => {
    const rooms = await repository.sqlgetRooms();
    return rooms 
}

const getRoomUsers = async () => {
    const users = await repository.sqlgetRoomUsers();
    return users
}

const saveMessage = async (room, message) => {
    const result = await repository.sqlsaveMessage(room, message)
}

const getMessages = async (room) => {
    const result = await repository.sqlgetMessages(room);
    return result
}

const deleteAllUsers = async () => {
    await repository.sqldeleteAllUsers()
}

module.exports = {
    createRoom,
    createUser,
    getUserRoom,
    updateUser,
    deleteUser,
    getRooms,
    getRoomUsers,
    saveMessage,
    getMessages,
    deleteAllUsers
}
