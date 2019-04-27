const mongoose = require('mongoose');
const { Schema } = mongoose;  //const Schema = mongoose.Schema 解構賦值
const userSchema = new Schema({
  // create the user collection Schema
  // define the record's property inside the collection
  /* when using mongoDB, we're allowed to have different property
     between each record in same collection */
  // we can add any property at any time
  googleId: String,
  credits: { type: Number, default: 0 }
});

// create a collection, called 'users', next time mongoose won't overwrite it
// In project, model represents collection.
mongoose.model('users', userSchema);
