const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  name: {type: String, required: true},
  category: {type: String, required: true},
  year: {type: Number, required: true},
  month: {type: Number, required: true},
  day: {type: Number, required: true},
  cost: {type: Number, required: true}
});

module.exports = mongoose.model('Transaction', transactionSchema);