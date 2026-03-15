const userModel = require('../models/user.model')

//add item to user cart


const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId
        ]) {
            cartData[req.body.itemId] = 1
        }
        else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData })
        res.json({
            message: "Added To Cart"
        })
    }
    catch (error) {
        console.log(error)
    }
}

//response items from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData })
        res.json({
            message: "Remove from cart"
        })
    }
    catch (error) {
        console.log(error)
    }
}
//fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData =  userData.cartData;
        res.json({
            message: "Get cart",
            cartData
        })
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = { addToCart, removeFromCart, getCart }