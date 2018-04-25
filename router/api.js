const express = require('express'),
      wallet = require('../models/wallet'),
      Transaction = require('../models/transaction'),
      Budget = require('../models/budget'),
      User = require('../models/user'),
      bcrypt = require('bcrypt'),
      helper = require('../public/javascript/helper');

const router = express.Router();
const Wallet = wallet.Wallet;
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', (req, res) => {
  res.send('HELLO');
});

router.get('/wallets/new', (req, res) => {
  res.render('newWallet');
});

router.post('/wallets', (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({
      message: 'Permission Denied'
    });
  }
  User.findOne({username: user.username}, (err, user) => {
    if (err) {
      console.error(err);
    } else {
      Wallet.create({
        name: req.body.name,
        currency: req.body.currency,
        initBalance: req.body.initBalance
      }).then(wallet => {
        user.wallets.push(wallet);
        user.save(err => {
          if (err) {
            console.log(err);
          } else {
            res.json({});
          }
        });
      });
    }
  });
});

router.get('/transactions', (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({
      message: 'Permission Denied'
    });
  }
  console.log(user);
  User.findOne({username: user.username}, (err, user) => {
    if (err) {
      console.error(err);
    } else {
      User.populate(user, {
        path: 'wallets'
      }, (err, user) => {
        if (err) {
          console.error(err);
        } else {
          Wallet.populate(user.wallets, [
            {path: 'transactions'},
            {path: 'budgets'}
          ], (err, wallets) => {
            if (err) {
              console.error(err);
            } else {
              res.json(wallets);
            }
          });
        }
      });
    }
  });
  // Wallet.find({}).populate('transactions').populate('budgets').exec((err, wallets) => {
  //   res.json(wallets);
  // });
});

router.get('/transactions/new', (req, res) => {
  res.render('newTransaction');
});

router.post('/transactions', (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({
      message: 'Permission Denied'
    });
  }
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

router.delete('/transactions', (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({
      message: 'Permission Denied'
    });
  }
  Wallet.findOne({name: req.body.wallet}, (err, wallet) => {
    if (err) {
      console.error(err);
    } else {
      Wallet.update(
        { _id: wallet._id },
        { $pull: { transactions: req.body.id } }
      ).then(() => res.json({}));
    }
  });
});

router.get('/users/signup', (req, res) => {
  res.render('signup');
});

router.post('/users/signup', (req, res) => {
  const hash= bcrypt.hashSync(req.body.password.trim(), 10);
  const user = new User ({
    username: req.body.username.trim(),
    password: hash
  });
  user.save((err, user) => {
    if (err) {
      console.error(err);
    } else {
      const token = helper.generateToken(user);
      res.json({
        token: token
      });
    }
  });
});

router.get('/users/signin', (req, res) => {
  res.render('signin');
});

router.post('/users/signin', (req, res) => {
  User.findOne({username: req.body.username})
    .exec((err, user) => {
      if (err) {
        console.error(err);
      } else {
        if (!user) {
          return res.status(404).json({
            error: true,
            message: 'Username or Password is wrong'
          });
        }
        bcrypt.compare(req.body.password, user.password, (err, valid) => {
          if (err || !valid) {
            return res.status(404).json({
              error: true,
              message: 'Username or Password is wrong'
            });
          }
          const token = helper.generateToken(user);
          res.json({
            username: user.username,
            token: token
          });
        });
      }
    });
});

module.exports = router;