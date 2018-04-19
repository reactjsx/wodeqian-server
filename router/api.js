const express = require('express'),
      Transaction = require('../models/transaction');

const router = express.Router();

router.use((req, res, next) => {
  console.log(`There's a request to our server!`);
  next();
});

router.get('/', (req, res) => {
  res.send('HELLO');
});

router.get('/transactions', (req, res) => {
  Transaction.find({}).then((transactions) => {
    res.json(transactions);
  });
});

router.post('/transactions', (req, res) => {
  Transaction.create({
    name: req.body.name,
    category: req.body.category,
    wallet: req.body.wallet,
    dateOccurred: req.body.dateOccurred,
    cost: req.body.cost
  }).then((transaction) => {
    console.log(transaction);
  });
});

module.exports = router;