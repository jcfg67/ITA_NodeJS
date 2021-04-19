const config = {
    port : 3000,            // Change to your desired port number 
    database : 'MySQL',     // Change database property to choose between these databases: 'MySQL' or 'MongoDB'
    mysqlDB : {
        host: 'localhost',
        user: 'user',               // Change to your MySQL database user
        password: 'password',       // Change to your MySQL database password
        database: 'DICE-GAME_I'     // Execute in terminal: mysql -u user -p < ./scripts/dice-game_I.sql
    },
    mongodbURI : "mongodb://localhost:27017/dice-game",     // Change link to your MongoDB database
    mongooseOptions: { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
}

module.exports = config;
