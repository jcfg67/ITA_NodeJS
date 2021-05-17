const { query } = require('../loaders/loaders');

const queryRoom = async name => {
    const result = await query(`SELECT room_id FROM rooms WHERE name = "${name}"`);
    if (result.length != 0) return result[0].room_id;
    return 0
}

const sqlCreateRoom = async name => {
    const result = await query(`INSERT INTO rooms (name) VALUES ('${name}')`);
    return result.insertId
}

const sqlCreateUser = async (username, socketId,roomId) => {
    const result = await query(`INSERT INTO users 
        (name, socket_id, room_id) VALUES ('${username}','${socketId}','${roomId}')`);
    return result.insertId
}

const sqlgetUserRoom = async (socketId) => {
    const result = await query(`SELECT name, room_id FROM users WHERE socket_id = '${socketId}'`);
    if (result.length == 0) return {room: '', username: ''};
    const roomId = result[0].room_id; 
    const result2 = await query(`SELECT name FROM rooms WHERE room_id = ${roomId}`)
    return { room: result2[0].name, username: result[0].name }
}

const sqlupdateUser = async (room, socketId) => {
    const roomId = await queryRoom(room);
    const result = await query(`UPDATE users SET room_id = ${roomId} WHERE  socket_id = '${socketId}'`);
    return result
}

const sqldeleteUser = async (socketId) => {
    const result = await query(`DELETE FROM users WHERE socket_id = '${socketId}'`);
    return result
}

const sqlgetRooms = async () => {
    const result = await query(`SELECT name FROM rooms`)
    return result
}

const sqlgetRoomUsers = async () => {
    const result = await query(`SELECT u.name, r.name as room FROM users u JOIN rooms r ON u.room_id = r.room_id`);
    return result
}

const sqlsaveMessage = async (room, message) => {
    const roomId = await queryRoom(room);
    const result = await query(`INSERT INTO messages (content, room_id) VALUES ('${message}', ${roomId})`)
}

const sqlgetMessages = async (room) => {
    const roomId = await queryRoom(room);
    const result = await query(`SELECT content FROM messages WHERE room_id = ${roomId}`);
    return result
}

const sqldeleteAllUsers = async () => {
    await query(`TRUNCATE TABLE users`)
}

module.exports = {
    queryRoom,
    sqlCreateRoom,
    sqlCreateUser,
    sqlgetUserRoom,
    sqlupdateUser,
    sqldeleteUser,
    sqlgetRooms,
    sqlgetRoomUsers,
    sqlsaveMessage,
    sqlgetMessages,
    sqldeleteAllUsers
}
