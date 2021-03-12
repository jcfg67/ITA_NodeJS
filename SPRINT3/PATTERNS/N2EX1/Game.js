const scoreboard = require('./Scoreboard') 

class Game {
    constructor() {
        this.players = [];
        this.scoreboard = scoreboard
    }

    addPlayers(newPlayer) {
        const player = {
            name: newPlayer,
            score: 0
        };
        this.players.push(player);
        console.log(`Player named ${newPlayer} added to the game.\n`)
        scoreboard.updateScoreboard(this.players);
    }
    
    changePlayerScore(player, value) {
        const playerFound = this.players.find(item => item.name == player );
        if (playerFound) {
            playerFound.score += value;
            if (playerFound.score < 0) playerFound.score = 0;
            scoreboard.updateScoreboard(this.players);
        }
        else console.log(`Player named ${player} not found in this game!\n`);
    }
}

module.exports = Game;

