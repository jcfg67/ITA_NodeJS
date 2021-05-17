const util = require('util');
const config = require('../config/config');

let connectDB;
const port = config.port;
let query;


if (config.database == 'MySQL') {
    const mysql = require('mysql');
    const db = mysql.createConnection(config.mysqlDB);
    query = util.promisify(db.query).bind(db);
    const connect = util.promisify(db.connect).bind(db);
    connectDB = async () => {
        try {
            console.log(`Connecting to a ${config.database} database...`);
            await connect();
            console.log(`MySQL DataBase connected`);
        }
        catch (err) {
            console.log('Failed to connect to MySQL');
            console.log('Check config file!');
            console.log(err.message);
            process.exit()
        }
    }
} else if (config.database == 'MongoDB') {
    const mongoose = require('mongoose');
    connectDB = async () => {
        try {
            console.log(`Connecting to a ${config.database} database...`);
            await mongoose.connect(config.mongodbURI, config.mongooseOptions);
            console.log(`MongoDB DataBase connected`);
        }
        catch (err) {
            console.log('Failed to connect to MongoDB');
            console.log('Check config file!');
            console.log(err.message);
            process.exit()
        }
    }
} else {
    console.log(`Check and fix config file! There's not a correct database name selected`);
    process.exit()
}

module.exports = { connectDB, port, query}
