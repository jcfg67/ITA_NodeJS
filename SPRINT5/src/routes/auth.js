const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile'], prompt: 'consent' }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/', session: false }), (req, res) => {
    req.app.set('user', req.user);
    res.redirect('/chat')
});

module.exports = router
