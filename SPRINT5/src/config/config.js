const config = {
    port : 3000,            // Change to your desired port number 
    database : 'MySQL',
    mysqlDB : {
        host: 'localhost',
        user: 'user',
        password: 'password',
        database: 'CHAT'
    },
    mongodbURI : "mongodb://localhost:27017/chat",
    mongooseOptions: { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
}

module.exports = config;
