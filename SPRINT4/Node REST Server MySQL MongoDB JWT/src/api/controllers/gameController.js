const config = require('../../config/config');

let services;

if (config.database == 'MySQL') {
    services = require('../../services/mysqlservices');
}
if (config.database == 'MongoDB') {
    services = require('../../services/mongodbservices');
}

const createPlayer = async (req, res) => {
    try {
        const name = req.body.name;
        const userExists = await services.checkUserExists(name);
        if (userExists) return res.status(409).send(`A user named ${name} already exists!`);
        await services.createPlayer(req.body);
        res.status(201).send(`New user created`)
    }
    catch(err) {
        const error = handleError(err);
        res.status(400).json(error)
    }
}

const updatePlayer = async (req, res) => {
    try {
        const { old_name, new_name } = {...req.body};
        let userExists = await services.checkUserExists(old_name);
        if (!userExists) return res.status(400).send(`A user named ${old_name} doesn't exist!`);
        userExists = await services.checkUserExists(new_name);
        if (userExists) return res.status(409).send(`A user named ${new_name} already exists!`);
        await services.updatePlayer(old_name, new_name);
        res.status(201).send(`User updated`)
    }
    catch(err) {
        const error = handleError(err);
        res.status(400).json(error)
    }
}

const rollDice = async (req, res) => {
    try {
        const id = req.params.id;
        const idExists = await services.checkIdExists(id);
        if (!idExists) return res.status(400).send(`A user with id: ${id} doesn't exist!`);
        const {side1, side2, diceTotal, score} = await services.rollDice(id);
        res.status(200).send(`${side1} + ${side2} = ${diceTotal} You ${score.toLowerCase()}!!`)
    }
    catch(err) {
        const error = handleError(err);
        res.status(400).json(error)
    }
}

const deletePlayResults = async (req, res) => {
    try {
        const id = req.params.id;
        const idExists = await services.checkIdExists(id);
        if (!idExists) return res.status(400).send(`A user with id: ${id} doesn't exist!`);
        await services.deletePlayResults(id);
        res.status(200).send(`Plays have been deleted!!`)
    }
    catch(err) {
        const error = handleError(err);
        res.status(400).json(error)
    }
}

const readPlayers = async (req, res) => {
    try {
        const result = await services.readPlayers();
        res.status(200).send(result)
    }
    catch(err) {
        const error = handleError(err);
        res.status(400).json(error)
    }
}

const readPlayResults = async (req, res) => {
    try {
        const id = req.params.id;
        const idExists = await services.checkIdExists(id);
        if (!idExists) return res.status(400).send(`A user with id: ${id} doesn't exist!`);
        const result = await services.readPlayResults(id);
        res.status(200).send(result)
    }
    catch(err) {
        const error = handleError(err);
        res.status(400).json(error)
    }
} 

const readRanking = async (req, res) => {
    try {
        const result = await services.readRanking();
        res.status(200).send(`The total players average is ${result}`)
    }
    catch(err) {
        const error = handleError(err);
        res.status(400).json(error)
    }
}

const readLoser = async (req, res) => {
    try {
        const result = await services.readLoser();
        res.status(200).send(result)
    }
    catch(err) {
        const error = handleError(err);
        res.status(400).json(error)
    }
}


const readWinner = async (req, res) => {
    try {
        const result = await services.readWinner();
        res.status(200).send(result)
    }
    catch(err) {
        const error = handleError(err);
        res.status(400).json(error)
    }
}

const handleError = (err, res) => {
    const error = {
        message : 'An error occurred while operating with the data base',
        error : err.message,
    };
    console.log(err);
    return error
}

module.exports = {
    createPlayer,
    updatePlayer,
    rollDice,
    deletePlayResults,
    readPlayers,
    readPlayResults,
    readRanking,
    readLoser,
    readWinner
}
