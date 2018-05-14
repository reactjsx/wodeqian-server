const mongoose = require('mongoose');
const wallet = require('./wallet');

const userSchema = new mongoose.Schema({
  nickname: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  wallets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wallet'
    }
  ],
  budgets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Budget'
    }
  ],
});

module.exports = mongoose.model('User', userSchema);