const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  name: {type: String, required: true},
  category: {type: String, required: true},
  dateOccurred: {type: Date, required: true},
  cost: {type: Number, required: true}
});

module.exports = mongoose.model('Transaction', transactionSchema);