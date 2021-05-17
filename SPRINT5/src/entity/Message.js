const { EntitySchema } = require('typeorm');
const Message = require('../models/Message');

module.exports = new EntitySchema({
    name: 'Message',
    tableName: 'messages',
    target: Message,
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        content: {
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
