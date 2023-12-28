
const express = require('express');
const router = express.Router();
const transactionController = require("../controllers/transaction.controller.js");
const authenticate = require('../middlewares/auth.js');

// For Create Txn
router.post("/create", authenticate, transactionController.createTransaction);

// Get All users Transaction for Admin
router.get("/getAll", authenticate, transactionController.getAllTransactions);

// Get Logged in Single User's All Transaction by UserId and email
router.get("/myTxns", authenticate, transactionController.getAllTransactionByUserId);

// Delete Logged in users Transaction by TxnId and Email
router.delete("/:transactionId", authenticate, transactionController.deleteTransaction);


module.exports = router;