const express = require('express');
const { connectDB, port } = require('./src/loaders/loaders');
const gameRoutes = require('./src/api/routes/gameRoutes');
const postLogin = require('./src/api/controllers/authController');
const authenticateToken = require('./src/middlewares/authMiddleware');

const app = express();

app.use(express.json());

app.post('/login', postLogin);

// game routes
app.use('/players', authenticateToken, gameRoutes);

(async () => {
    await connectDB();
    app.listen(port, () => console.log(`Dice_Game Server running...on port ${port}`));
})();
