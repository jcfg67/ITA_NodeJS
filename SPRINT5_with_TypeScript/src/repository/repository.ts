import { getConnection } from 'typeorm';
import { User } from '../entity/User';
import { Room } from '../entity/Room';
import { Message } from '../entity/Message';


export const createRoom = async (room: string) => {
    const connection = getConnection();
    const roomRepository = connection.getRepository(Room);
    const foundRoom = await roomRepository.find({ name: room });
    if (foundRoom.length != 0) return { created: false, room: foundRoom[0] };
    const newRoom = new Room();
    newRoom.name = room;
    const savedRoom = await roomRepository.save(newRoom);
    return { created: true, room: savedRoom }
}

export const createUser = async (room: string, user: User, socketId: string) => {
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

export const getUsers = async () => {
    const connection = getConnection();
    const users = await connection.getRepository(User).
        find({ relations: ["room"] });
    return users
}

export const getRooms = async () => {
    const rooms = await getConnection().getRepository(Room).find();
    return rooms
}

export const saveMessage = async (room: string, message: string )=> {
    const foundRoom = await getConnection().
        getRepository(Room).find({ name: room});
    const newMessage = new Message();
    newMessage.content = message;
    newMessage.room = foundRoom[0];
    await getConnection().getRepository(Message).save(newMessage)
}

export const getMessages = async (roomName: string) => {
    const messages = await getConnection().getRepository(Message).
        createQueryBuilder('message').
        leftJoinAndSelect('message.room','room').
        where('room.name = :name', { name: roomName}).getMany();
    return messages
}

export const updateUser = async (roomName: string, socketId: string) => {
    const connection = getConnection();
    const room = await connection.getRepository(Room).
        find({ name: roomName});
    const foundUser = await connection.getRepository(User).
        find({ socketId });
    const user = foundUser[0];
    user.room = room[0];
    await connection.getRepository(User).save(user)
}

export const getUserRoom = async (socket_Id: string) => {
    const connection = getConnection();
    const foundUser = await connection.getRepository(User).
        find({ relations: ["room"], where : { socketId : socket_Id } } );
    if (foundUser.length == 0) return {room: '', username: ''};
    const user = foundUser[0];
    return { room: user.room?.name, username: user.name }
}

export const deleteUser = async (socket_Id: string) => {
    const connection = getConnection();
    const foundUser = await connection.getRepository(User).
        find({ relations: ["room"], where : { socketId : socket_Id } } );
    const user = foundUser[0];
    user.socketId = '';
    user.room = null;
    await connection.getRepository(User).save(user)
}
