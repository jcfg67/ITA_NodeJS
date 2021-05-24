const detectTSNode = require('detect-ts-node');

const commonConfig = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "user",
    "password": "password",
    "database": "CHAT_TS_TYPEORM_II",
    "synchronize": true,
    "logging": false
};

const srcConfig = {
    "entities": [
        "src/entity/**/*.ts"
     ]
};

const distConfig = {
    "entities": [
        "dist/entity/**/*.js"
     ]
};

const result = {};

// Append common configs to final object
for (let key in commonConfig) {
    if (commonConfig.hasOwnProperty(key)) {
        result[key] = commonConfig[key];
    }
}

if (detectTSNode) {
    // if ts-node append src configuration
    for (let key in srcConfig) {
        if (srcConfig.hasOwnProperty(key)) {
            result[key] = srcConfig[key];
        }
    }
} else {
    // else append dist configuration
    for (let key in distConfig) {
        if (distConfig.hasOwnProperty(key)) {
            result[key] = distConfig[key];
        }
    }
}


module.exports = result;
