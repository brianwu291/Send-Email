const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');//access to cookie
const passport = require('passport');
const bodyParser = require('body-parser'); // handle express req.body middleware

// call passport to handle cookie with cookie-session lib
const keys = require('./config/keys.js');
require('./modules/User.js'); // 執行以創建users collection in mongoDB
require('./modules/Survey.js'); // 執行以創建survey collection in mongoDB
require('./services/passport.js');  // 執行passport.js裡面的code

mongoose.connect(keys.mongodbURI); //請mongoose來幫我們與mongodb溝通

const app = express();

// Underneath app.use() method play middleware role in express.
app.use(bodyParser.json());
app.use(
  cookieSession({
    //config object maxAge is the cookie's life-term
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // To encript the cookie
    keys: [keys.cookieKey]
  })
);
// tell passport to handle cookie stuff with mongoDB
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes.js')(app);  // 執行 authRoutes
require('./routes/billingRoutes.js')(app); // 執行 billingRoutes
require('./routes/surveyRoutes.js')(app); // 執行 surveyRoutes

if (process.env.NODE_ENV === 'production') {
  // express will serve up production assets, like main.js or main.css files.
  app.use(express.static('client/build'));

  // express will serve up the index.html file if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
// 開發時，記得先 run chmod +x sendgrid_webhook.sh
