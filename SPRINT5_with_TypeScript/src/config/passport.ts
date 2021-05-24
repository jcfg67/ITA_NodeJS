import * as googleStrategy from 'passport-google-oauth20'
import { User } from '../entity/User';
import { config } from './config';
import { getConnection } from 'typeorm';
import { PassportStatic } from 'passport';

const GoogleStrategy = googleStrategy.Strategy;

export const passportConfig = (passport: PassportStatic) => {
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
