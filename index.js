const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      helmet = require('helmet'),
      morgan = require('morgan'),
      Transaction = require('./models/transaction'),
      apiRouter = require('./router/api');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const mongoDB = 'mongodb://toffy:thaonguyen2604@ds247759.mlab.com:47759/wodeqian';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection Error!'));

// Transaction.create({
//   name: 'Miso Ramen',
//   category: 'Lunch',
//   wallet: 'Cash',
//   dateOccurred: Date.now(),
//   cost: 800
// }).then((transaction) => {
//   console.log(transaction);
// });

app.use(morgan('common'));
app.use(helmet());

app.use('/api', apiRouter);

app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server is listening at http://${process.env.IP}:${process.env.PORT}`);
})