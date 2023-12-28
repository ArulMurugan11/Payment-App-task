const db = require("../models");
const bcrypt = require("bcryptjs");
const userService = require("../services/user.service");
const User = db.User;
const Transaction = db.Transaction;
const Op = db.Sequelize.Op;

// For User SignUp
async function signUp(req, res) {
    const { userName, email, mobile } = req.body
    const password = await userService.bcryptHash(req.body?.password)
    const user = {
        userName,
        email,
        mobile,
        password
    }
    const userExist = await User.findOne({
        where: {
            [Op.or]: [
                {
                    email
                },
                {
                    userName
                }
            ]
        }
    })
    if (userExist) {
        const msg = userExist?.email == email ? "User Email Already Exist" : "User Name Already Exist"
        return res.status(409).send({ message: msg })
    } else {
        try {
            const userDetails = await User.create(user)
            delete userDetails.password
            return res.status(200).send(userDetails);
        } catch (err) {
            // bad request error
            return res.status(400).send({ message: "Invalid Email" });
        }
    }
}

// For User Login
async function login(req, res) {
    let password = req.body?.password;
    const user = await User.findOne({
        where: {
            email: req.body?.email,
        }
    })
    if (!user) {
        return res.status(404).send({ message: "User Not Found Or Invalid Mail" })
    }
    bcrypt.compare(password, user.password, async (err, result) => {
        if (err) {
            return res.status(401).send({
                error: err,
            });
        }
        if (result) {
            let token = await userService.generateToken(user);
            await User.update({ token }, {
                where: {
                    userId: user.userId
                }
            })
            return res.status(200).send({
                message: "Login Succesful",
                token,
            });
        } else {
            return res.status(401).send({
                message: "Password Does not Match",
            });
        }
    });
}

// For GET ALL User
async function getAllUser(req, res) {
    const allUsers = await User.findAll()
    if (allUsers.length == 0) {
        return res.status(404).send({ message: "No Users Found" })
    }
    return res.status(200).send(allUsers)
}

// For GET SINGLE User
async function getUser(req, res) {
    const user = await User.findOne({
        where: {
            userId: req.params?.id
        }
    })
    if (!user) {
        return res.status(404).send({ message: "User Not Found" })
    }
    return res.status(200).send(user)
}


// For GET User Profile with Txn History
async function profile(req, res) {
    const userDetails = req?.user
    const transaction = await Transaction.findAll({
        where: {
            userId: userDetails.userId
        }
    })
    if (!transaction.length) {
        return res.status(200).send({
            message: "Transaction Not Found Or No Transactions Made By User Yet",
            userDetails
        })
    }
    return res.status(200).send({
        message: "profile page With Transaction History",
        userDetails,
        transaction
    })
}


module.exports = {
    signUp,
    login,
    getAllUser,
    getUser,
    profile
}
