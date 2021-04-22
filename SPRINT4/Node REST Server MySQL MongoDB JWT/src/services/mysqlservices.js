const { query } = require('../loaders/loaders');

const checkUserExists = async name => {
    if (name == undefined || name == "") return false;
    const result = await query(`SELECT name FROM players WHERE name = "${name}"`);
    if (result.length != 0) return true;
    return false
}

const createPlayer = async player => {
    let name = player.name;
    if (name == undefined || name == "") name = "ANONYMOUS";
    const result = await query('INSERT INTO players SET ?', {name: `${name}`});
    if (name == "ANONYMOUS") await query(`UPDATE players SET name = "${name}_${result.insertId}" WHERE name = "${name}"`)
} 

const updatePlayer = async (old_name, new_name) => {
    await query(`UPDATE players SET name = "${new_name}" WHERE name = "${old_name}"`)
}

const checkIdExists = async id => {
    if(typeof(id) !== "number" && !Number.isInteger(+id)) return false;
    const result = await query(`SELECT name FROM players WHERE player_id = ${id}`);
    if (result.length != 0) return true;
    return false
}

const rollDice = async id => {
    const side1 = Math.floor( Math.random() * 6 ) + 1;
    const side2 = Math.floor( Math.random() * 6 ) + 1;
    const diceTotal = side1 + side2;
    const score = diceTotal == 7 ? "WIN" : "LOSS";
    await query('INSERT INTO games SET ?', 
                 { dice_1_result: side1,
                   dice_2_result: side2,
                   score: score,
                   player_id: id
                   });
    let result = await query(`SELECT COUNT(*) AS totalplays FROM games WHERE player_id = ${id}`);
    const totalPlays = result[0].totalplays;
    result = await query(`SELECT COUNT(*) AS totalWinResults FROM games WHERE player_id = ${id} AND score = "WIN"`);
    const totalWinResults = result[0].totalWinResults;
    const average = totalWinResults / totalPlays;
    await query(`UPDATE players SET average = ${average} WHERE  player_id = ${id}`);
    return {side1, side2, diceTotal, score}
}

const deletePlayResults = async id => {
    await query('DELETE FROM games WHERE player_id = ?', id);
    await query(`UPDATE players SET average = 0 WHERE  player_id = ${id}`)
}

const readPlayers = async () => {
    const result = await query('SELECT * FROM players');
    return result
}

const readPlayResults = async id => {
    const result = await query(`SELECT * FROM games WHERE player_id = ${id}`);
    return result
}

const readRanking = async () => {
    let result = await query(`SELECT COUNT(*) AS totalplayers FROM players`);
    const totalPlayers = result[0].totalplayers;
    if (totalPlayers == 0) return [];
    result = await query(`SELECT SUM(average) AS totalAverage FROM players`);
    const totalAverage = result[0].totalAverage;
    return totalAverage/totalPlayers
}

const readLoser = async () => {
    let result = await query(`SELECT COUNT(*) AS totalplayers FROM players`);
    const totalPlayers = result[0].totalplayers;
    if (totalPlayers == 0) return [];
    result = await query(`SELECT MIN(average) AS minAverage FROM players`);
    const minAverage = result[0].minAverage;
    result = await query(`SELECT * FROM players WHERE average = ${minAverage}`);
    return result
}

const readWinner = async () => {
    let result = await query(`SELECT COUNT(*) AS totalplayers FROM players`);
    const totalPlayers = result[0].totalplayers;
    if (totalPlayers == 0) return [];
    result = await query(`SELECT MAX(average) AS maxAverage FROM players`);
    const maxAverage = result[0].maxAverage;
    result = await query(`SELECT * FROM players WHERE average = ${maxAverage}`);
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