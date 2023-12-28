const express = require('express');
require("dotenv").config();
const bodyParser = require('body-parser');
const app = express();
const db = require("./src/models");
const port = process.env.PORT || 3000;
const userRouter = require('./src/routes/user.route');
const walletRouter = require('./src/routes/wallet.route');
const transactionRouter = require('./src/routes/transaction.route');


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/user', userRouter);
app.use('/wallet', walletRouter);
app.use('/transaction', transactionRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ 'message': err.message });
  return;
});


db.sequelize.
  // sync({ force: true })
  sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
