const config = {
    port : 5000,            // Change to your desired port number 
    database : 'MySQL',     // Change database property to choose between these databases: 'MySQL' or 'MongoDB'
    mysqlDB : {
        host: 'localhost',
        user: 'user',
        password: 'password',
        database: 'CHATOAUTH'
    },
    mongodbURI : "mongodb://localhost:27017/chatoag",
    mongooseOptions: { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    google : {
        clientID : 'XXXXX',
        clientSecret : 'YYYYY'
    }
}

module.exports = config;
