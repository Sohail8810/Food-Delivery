const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')

//login user

const loginUser = async (req, res) => {
const {email,password} =req.body;
try{
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(400).json({
            message:"User Doesn't exists"
        })
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(200).json({
            message:"Invaild credentials"
        })
    }
    const token = createToken(user._id);
    res.json({
        message:"Logged Successfully",
        token})
}
catch(error){
console.log(error)
}
}
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

//register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        //checking is user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(200).json({
                message: "User Already exists"
            })
        }
        //validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: "Please enter a valid email"
            })
        }
        if (password.length < 8) {
            return res.status(400).json({
                message: "please enter a strong password"
            })
        }
        //hashing use password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })
        const user = await newUser.save()
        const token = createToken(user._id)
        return res.json({
            message: "User Register Successfully",
            token
        })
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = { loginUser, registerUser };