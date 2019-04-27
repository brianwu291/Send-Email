const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google', passport.authenticate('google', {
      // means: hey passport, when someone head to this url,it means he or she
      // try to authenticate with 'google', use the GoogleStrategy.
      scope: ['profile', 'email']
      // means: access user's google account info (email and profile)
    })
  );

  // after auth/google, it will redirect to /auth/google/callback.
  // passport.authenticate('google') means take the code which come from
  // google, the send request to google to access user's info.
  // after passport.authenticate('google') has been done, the request will
  // be send to next arrow function. To execute redirect('/surveys')
  app.get(
    '/auth/google/callback', 
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get(
    '/api/logout', 
    (req, res) => {
      // logout process
      req.logout();
      //res.send(req.user);
      res.redirect('/');
    }
  )

  //驗證cookie機制的route
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
