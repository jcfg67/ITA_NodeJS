class Scoreboard {
    constructor() {
        this.score = []
    }

    updateScoreboard(players) {
        this.score = players.sort((a,b) => b.score - a.score);
        if (this.score.length == 0) console.log(`There are no players yet!`);
        else {
            console.log("SCOREBOARD")
            this.score.forEach(player => console.log(`${player.name} scores ${player.score} points`))
            console.log()
        }
    }
}

const scoreboard = new Scoreboard();

module.exports = scoreboard;
