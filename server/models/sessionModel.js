const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  // userId: String, 
  cookieId: { type: String || Number, required: true, unique: true },
  createdAt: { type: Date, expires: 7, default: Date.now }
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;