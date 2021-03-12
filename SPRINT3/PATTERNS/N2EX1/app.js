const Game = require('./Game');

const game = new Game();

game.addPlayers("Player_1");
game.addPlayers("Player_2");
game.addPlayers("Player_3");
game.changePlayerScore("Player_1", 25);
game.changePlayerScore("Player_2", 50);
game.changePlayerScore("Player_5", 25);
game.changePlayerScore("Player_2", 30);
game.changePlayerScore("Player_2", -65);
game.addPlayers("Player_4");
game.changePlayerScore("Player_1", -30);
