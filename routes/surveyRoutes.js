const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose'); // survey collection 添加記錄
const requireLogin = require('../middlewares/requireLogin.js');
const requireCredits = require('../middlewares/requireCredits.js');
const Mailer = require('../services/Mailer.js');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate.js');

// pull out Survey collection from mongoose. This is a Survey class
const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({
      _user: req.user.id
    }).select({
      recipients: false
    });

    res.send(surveys);
  });
  // this th thank you page after user click the link
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks For Voting!');
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    // create new record instance(not yet 寫入資料庫，只是創建在記憶體中)
    const survey = new Survey({
      title,
      subject,
      body,
      //這裡給survey的sub collection: email，添加紀錄。
      recipients: recipients.split(',').map(email => ({ email: email.trim(), responded: false })),
      // 讓每個survey都有對應到創建這個survey的用戶(user)
      // 這裡的user.id的id是mongoDB在創建user collection時加上的，所以可以直接取用
      _user: req.user.id,
      dateSent: Date.now(),
      lastResponded: new Date()
    });

    // new Mailer() first argument is survey instance,
    // second argument is a function, return email template which is an HTML
    const emailTemplate = surveyTemplate(survey);
    const mailer = new Mailer(survey, emailTemplate);

    try {
        // send an email here !
      await mailer.send();
      // save this survey to database
      await survey.save();
      // minus user's credit, save to database and send back to client
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    }
    catch (err) {
      // handle error situation
      res.status(422).send(err);
    }
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      .map(({ email, url }) => {
          const match = p.test(new URL(url).pathname);
          if (match) {
            return {
              email,
              surveyId: match.surveyId,
              choice: match.choice
            };
          }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
        }, {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date()
        }).exec();
      })
      .value();

    res.send({});
  });
};
