const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient.js');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],  //tell mongoose this is an array contain lists of string
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  //this line tell mongoDB every survey reference to a user collection
  dateSent: Date,
  lastResponded: Date
});

mongoose.model('surveys', surveySchema);
