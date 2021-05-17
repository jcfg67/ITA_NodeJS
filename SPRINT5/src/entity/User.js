const { EntitySchema } = require('typeorm');
const User = require('../models/User');

module.exports = new EntitySchema({
    name: 'User',
    tableName: 'users',
    target: User,
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        googleId: {
            type: 'varchar'
        },
        name: {
            type: 'varchar'
        },
        socketId: {
            type: 'varchar'
        }
    },
    relations: {
        room: {
            target: 'Room',
            type: 'many-to-one',
            joinColumn: true,
            cascade: true
        }
    }
});
