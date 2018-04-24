const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      helmet = require('helmet'),
      morgan = require('morgan'),
      wallet = require('./models/wallet'),
      User = require('./models/user'),
      Transaction = require('./models/transaction'),
      Budget = require('./models/budget'),
      apiRouter = require('./router/api');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
const mongoDB = 'mongodb://toffy:thaonguyen2604@ds247759.mlab.com:47759/wodeqian';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection Error!'));

const Wallet = wallet.Wallet;
// const newWallet = new Wallet({
//   name: 'Chun Cash',
//   currency: 'yen',
//   initBalance: 20000,
// });

// Transaction.create({
//   name: 'Bread',
//   category: 'Convenient',
//   year: 2018,
//   month: 4,
//   day: 20,
//   cost: 200
// }, (err, transaction) => {
//   if (err) {
//     console.error(err);
//   } else {
//     newWallet.transactions.push(transaction);
//     newWallet.save((err) => {
//       if (err) {
//         console.error(err);
//       }
//     });
//   }
// });

// Budget.create({
//   category: 'Convenient',
//   year: 2018,
//   month: 4,
//   amount: 15000
// }, (err, budget) => {
//   if (err) {
//     console.error(err);
//   } else {
//     newWallet.budgets.push(budget);
//     newWallet.save((err) => {
//       if (err) {
//         console.error(err);
//       }
//     });
//   }
// });

// User.findOne({username: 'toffy'}, (err, user) => {
//   if (err) {
//     console.error(err);
//   } else {
//     User.populate(user, {
//       path: 'wallets'
//     }, (err, user) => {
//       Wallet.populate(user.wallets, [
//         {path: 'transactions'},
//         {path: 'budgets'}
//       ], (err, wallet) => {
//         console.log(wallet);
//       })
//     })
//   }
// })

app.use(morgan('common'));
app.use(helmet());
app.use('/api', apiRouter);
app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server is listening at http://${process.env.IP}:${process.env.PORT}`);
})