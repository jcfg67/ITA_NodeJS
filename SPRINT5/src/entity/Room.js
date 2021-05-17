const { EntitySchema } = require('typeorm');
const Room = require('../models/Room');

module.exports = new EntitySchema({
    name: 'Room', // Will use table name `room` as default behaviour.
    tableName: 'rooms', // Optional: Provide `tableName` property to override the default behaviour for table name.
    target: Room,
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        name: {
            type: 'varchar'
        }
    }
});
