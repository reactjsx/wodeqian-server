const mongoose = require('mongoose');
const wallet = require('./wallet');

const userSchema = new mongoose.Schema({
  nickname: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  wallets: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wallet'
    }
  ]
});

module.exports = mongoose.model('User', userSchema);