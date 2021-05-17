const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const config = require('./config');
const { getConnection } = require('typeorm');

module.exports = (passport) => {
  passport.use(new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: '/auth/google/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = new User();
        newUser.googleId = profile.id;
        //newUser.name = profile.name.givenName;
        newUser.name = profile.displayName;
        newUser.socketId = '';

        const connection = getConnection();
        const userRepository = connection.getRepository(User);

        try {
          let user = await userRepository.findOne({ googleId: profile.id });
          if (user) {
            done(null, user)
          } else {
            user = await userRepository.save(newUser);
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )
}
