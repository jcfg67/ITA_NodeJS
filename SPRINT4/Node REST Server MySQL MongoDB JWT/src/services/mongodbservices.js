const Player = require('../models/player');

const checkUserExists = async name => {
    if (name == undefined || name == "") return false;
    const result = await Player.exists({ "name" : name });
    return result
}

const createPlayer = async user => {
    let name = user.name;
    if (name == undefined || name == "") name = "ANONYMOUS";
    const player = new Player({name});
    await player.save()
} 

const updatePlayer = async (old_name, new_name) => {
    await Player.findOneAndUpdate(
        { "name": old_name },
        { "name": new_name },
        { new: true })
}

const checkIdExists = async id => {
    const result = await Player.exists({ "_id" : id });
    return result
}

const rollDice = async id => {
    const side1 = Math.floor( Math.random() * 6 ) + 1;
    const side2 = Math.floor( Math.random() * 6 ) + 1;
    const diceTotal = side1 + side2;
    const score = diceTotal == 7 ? "WIN" : "LOSS";
    let result = await Player.findById(id);
    result.plays = [...result.plays, [side1, side2, score]];
    await Player.updateOne({_id: id}, {plays : result.plays});
    result = await Player.findById(id);
    const totalplays = result.plays.length;
    const totalWinResults = result.plays.filter(x => x[2]=='WIN').length;
    const average = totalWinResults/totalplays;
    await Player.updateOne({_id: id}, {average});
    return {side1, side2, diceTotal, score}
}

const deletePlayResults = async id => {
    await Player.updateOne({_id: id}, {plays : [], average: 0})
}

const readPlayers = async () => {
    const result = await Player.find({});
    return result
}

const readPlayResults = async id => {
    const result = await Player.findById(id);
    return result
}

const readRanking = async () => {
    let result = await Player.aggregate([
        { $group: {
            _id: null,
            total: { $sum: "$average" }
            }
        }]);
    const totalAverage = result[0].total;
    const totalPlayers = await Player.countDocuments({});
    return totalAverage/totalPlayers
}

const readLoser = async () => {
    let result = await Player.find().sort({average: 1});
    const minAverage = result[0].average;
    result = result.filter(item => item.average == minAverage);
    return result
}

const readWinner = async () => {
    let result = await Player.find().sort({average: -1});
    const maxAverage = result[0].average;
    result = result.filter(item => item.average == maxAverage);
    return result
}

module.exports = {
    checkUserExists,
    createPlayer,
    updatePlayer,
    checkIdExists,
    rollDice,
    deletePlayResults,
    readPlayers,
    readPlayResults,
    readRanking,
    readLoser,
    readWinner
}
