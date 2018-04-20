const express = require('express'),
      Wallet = require('../models/wallet'),
      Transaction = require('../models/transaction'),
      Budget = require('../models/budget');

const router = express.Router();

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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

router.get('/transactions/new', (req, res) => {
  res.render('new');
});

router.post('/transactions', (req, res) => {
  Wallet.findOne({name: req.body.wallet}, (err, wallet) => {
    if (err) {
      console.error(err);
    } else {
      Transaction.create({
        name: req.body.name,
        category: req.body.category,
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
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
  res.json({});
});

module.exports = router;