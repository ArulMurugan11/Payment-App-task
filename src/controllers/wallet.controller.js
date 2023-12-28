const db = require("../models");
const Wallet = db.Wallet;
const User = db.User;



async function createWallet(req, res) {
    const { userId, amount } = req.body
    const userExist = await User.findOne({
        where: {
            userId,
        }
    })
    if (!userExist) {
        return res.status(404).send({ message: "Invalid User Id/User Not Found" })
    }
    const walletDetails = {
        userId,
        balance: amount,
        email: userExist?.email
    }
    const walletExist = await Wallet.findOne({
        where: {
            userId,
        }
    })
    if (walletExist) {
        return res.status(409).send({ message: "Wallet Already Exists" })
    }
    try {
        const wallet = await Wallet.create(walletDetails)
        return res.status(200).send({
            message: "Wallet Created SuccessFully",
            wallet
        })
    } catch (err) {
        return res.status(400).send("Bad Request")
    }

}
// Get Wallet by UserId
async function getWallet(req, res) {
    const wallet = await Wallet.findOne({
        where: {
            userId: req.params?.userId

        }
    })
    if (!wallet) {
        return res.status(404).send({ message: "User Not Have Wallet" })
    }
    return res.status(200).send(wallet)

}

// Update Wallet by UserId
// No need this method
async function updateWallet(req, res) {
    const { amount, userId } = req.body;
    if (!userId) {
        return res.status(400).send("UserId is Mandatory")
    }
    const result = await Wallet.update({ balance: amount }, {
        where: {
            userId
        }
    })
    return res.status(201).send({
        message: "Wallet Updated Successfully",
        result
    })

}

// Delete Wallet by UserId
async function deleteWallet(req, res) {
    const userId = req.params?.userId;
    console.log("delete method wallet", userId)
    if (!userId) {
        return res.status(400).send("UserId is Mandatory")
    }
    try {
        await Wallet.destroy({
            where: {
                userId
            }
        })
        return res.status(201).send({
            message: "Wallet Deleted Successfully"
        })
    } catch (err) {
        return res.status(400).send("Error While Deleteing Wallet")
    }

}

module.exports = {
    createWallet,
    getWallet,
    updateWallet,
    deleteWallet
}