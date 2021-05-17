class User {
    constructor(id, googleId, name, socketId, room) {
        this.id = id;
        this.googleId = googleId;
        this.name = name;
        this.socketId = socketId;
        this.room = room
    }
}

module.exports = User;

