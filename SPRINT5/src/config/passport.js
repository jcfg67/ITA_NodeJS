const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('./config');

module.exports = (passport) => {
  passport.use(new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: '/auth/google/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        const user = { googleId : profile.id, name : profile.name.givenName };
        done(null, user)
      })
  )
}
