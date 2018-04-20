const express = require('express'),
      Wallet = require('../models/wallet'),
      Transaction = require('../models/transaction'),
      Budget = require('../models/budget');

const router = express.Router();

router.use((req, res, next) => {
  console.log(`There's a request to our server!`);
  next();
});

router.get('/', (req, res) => {
  res.send('HELLO');
});

router.get('/transactions', (req, res) => {
  Wallet.findOne({name: 'Chun Cash'}).populate('transactions').populate('budgets').exec((err, wallet) => {
    if (err) {
      console.error(err);
    } else {
      res.json(wallet);
    }
  });
});

router.post('/transactions', (req, res) => {
  Wallet.findOne({name: req.body.wallet}, (err, wallet) => {
    if (err) {
      console.error(err);
    } else {
      Transaction.create({
        name: req.body.name,
        category: req.body.category,
        dateOccurred: req.body.date,
        cost: req.body.cost
      }, (err, transaction) => {
        if (err) {
          console.error(err);
        } else {
          wallet.transactions.push(transaction);
          wallet.save((err) => {
            if (err) {
              console.error(err);
            }
          });
        }
      });
    }
  });
});

module.exports = router;