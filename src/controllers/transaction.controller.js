const db = require("../models");
const Transaction = db.Transaction;
const User = db.User;
const Wallet = db.Wallet;



async function createTransaction(req, res) {
    const { amount, transactionFor } = req.body
    const { email, userId } = req.user
    if (!email) {
        return res.status(409).send({ message: "Email is Mandatory" })
    }
    if (!amount) {
        return res.status(409).send({ message: "Please Enter The Amount" })
    }
    const userExist = await User.findOne({
        where: {
            email,
        }
    })
    if (!userExist) {
        return res.status(404).send({ message: "Invalid User Email/User Not Found" })
    }
    const wallet = await Wallet.findOne({
        where: {
            email
        }
    })
    if (!wallet) {
        return res.status(404).send({ message: "Wallet Not Found" })
    }
    if (+(wallet?.balance) == 0 || +(wallet?.balance) < +(amount)) {
        return res.status(409).send({ message: "Not Having Enough Money to Proceed this Transaction" })
    }
    const transactionDetails = {
        userId,
        amount,
        email,
        transactedTo: transactionFor
    }
    try {
        let newBalance = Number(wallet?.balance) - Number(amount);
        const transaction = await Transaction.create(transactionDetails)
        await Wallet.update({ balance: newBalance }, {
            where: {
                userId
            }
        })
        return res.status(200).send({
            message: "Transaction Made SuccessFully",
            transaction
        })
    } catch (err) {
        return res.status(400).send({
            message: "Bad Request",
            err
        })
    }

}
// Get All users Transaction
// for Admin
async function getAllTransactions(req, res) {
    const transaction = await Transaction.findAll({
        include: [User]
    })
    if (transaction.length == 0) {
        return res.status(404).send({ message: "Transactions Not Found" })
    }
    return res.status(200).send(transaction)

}

// Get Single Users All Transaction by UserId
async function getAllTransactionByUserId(req, res) {
    const transaction = await Transaction.findAll({
        where: {
            userId: req.user?.userId
        },
        include: [User]
    })
    if (transaction.length == 0) {
        return res.status(404).send({ message: "Transaction Not Found" })
    }
    return res.status(200).send(transaction)

}

// Update Transaction is Not Needed I think

// async function updateTransaction(req, res) {
//     const { balance, userId } = req.body;
//     if (!userId) {
//         return res.status(400).send("UserId is Mandatory")
//     }
//     const result = await Transaction.update({ balance }, {
//         where: {
//             userId
//         }
//     })
//     return res.status(201).send({
//         message: "Transaction Updated Successfully",
//         result
//     })

// }

// Delete Transaction by UserId
async function deleteTransaction(req, res) {
    const transactionId = req.params?.transactionId;
    if (!transactionId) {
        return res.status(400).send("TransactionId is Mandatory")
    }
    try {
        await Transaction.destroy({
            where: {
                userId: req.user?.userId,
                id: transactionId
            }
        })
        return res.status(201).send({
            message: "Transaction Deleted Successfully"
        })
    } catch (err) {
        return res.status(400).send("Error While Deleteing Transaction")
    }

}

module.exports = {
    createTransaction,
    getAllTransactions,
    getAllTransactionByUserId,
    // updateTransaction,
    deleteTransaction
}
