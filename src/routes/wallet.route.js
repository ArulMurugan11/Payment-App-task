
const express = require('express');
const router = express.Router();
const walletController = require("../controllers/wallet.controller.js");
const authenticate = require('../middlewares/auth.js');


router.post("/create", authenticate, walletController.createWallet);
router.patch("/update", authenticate, walletController.updateWallet);
router.get("/:userId", authenticate, walletController.getWallet);
router.delete("/:userId", authenticate, walletController.deleteWallet);



module.exports = router;