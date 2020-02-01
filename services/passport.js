const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys.js');

// pull out users collection from mongoose. This is a user class 
const User = mongoose.model('users');

// after authenficate the user, we should create session id for user.
// pull out user's id from mongoDB
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(
  async (id, done) => {
    const userWithId = await User.findById(id);
    done(null, userWithId);
  }
);

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    userProfileURL: "https://www.googleapis.com/oauth2/v2/userinfo",
    proxy: true
  }, // arrow function here will be called when we get user's pemission
     // from google (by send goole the callback code=....)
    async (accessToken, refreshToken, profile, done) => {
      // accessToken: use to when user come back, access user info from google
      // refreshToken: use to refresh the accessToken
      const googleId = profile._json.id
      // find if there is a user already exist
      // this is a async move(send something to database)
      const existinguser = await User.findOne({ googleId });
      if (existinguser) {
        // already have the record with given user id, call done()
        return done(null, existinguser);
      }
      // find nothing, create a new record
      // use User class to create an User instance(which is record in collection)
      // .save() means save these records into mongoDB
      const newUser = await new User({ googleId }).save();
      done(null, newUser);
  })
);

/*
.then(existinguser => {
  if (existinguser) {
    // already have the record with given user id, call done()
    done(null, existinguser);
  }else{
    // find nothing, create a new record
    // use User class to create an User instance(which is record in collection)
    // .save() means save these records into mongoDB
    new User({ googleId: profile.id })
      .save()
      .then(user => done(null, user));
  }
});
*/
