const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  name: {type: String, required: true},
  currency: {type: String, required: true},
  initBalance: {type: Number, required: true},
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction'
    }
  ],
  budgets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Budget'
    }
  ]
});

module.exports.Wallet = mongoose.model('Wallet', walletSchema);
module.exports.walletSchema = walletSchema;