const express = require('express');
const gameController = require('../controllers/gameController');

const router = express.Router();

router.post('/', gameController.createPlayer);
router.put('/', gameController.updatePlayer);
router.post('/:id/games', gameController.rollDice);
router.delete('/:id/games', gameController.deletePlayResults);
router.get('/', gameController.readPlayers);
router.get('/:id/games', gameController.readPlayResults);
router.get('/ranking', gameController.readRanking);
router.get('/ranking/loser', gameController.readLoser);
router.get('/ranking/winner', gameController.readWinner);

module.exports = router;
