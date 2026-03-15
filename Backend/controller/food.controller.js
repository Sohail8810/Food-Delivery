const { error } = require('console')
const foodModel = require('../models/food.model')
const fs = require('fs')


// add food item

const addFood = async(req,res)=>{
    const image__filename = `${req.file.filename}`
const food = new foodModel({
    name:req.body.name,
    description : req.body.description,
    price: req.body.price,
    category:req.body.category,
    image:image__filename
})
try{
    await food.save();
    res.status(200).json({
        message:"Food Added"
    })
}
catch(error){
    console.log(error)
}
}
//all food list
const listFood = async (req,res)=>{
try{
    const food = await foodModel.find({})
    res.json({success:true,data:food})
}
catch(error){
    console.log(error)
}
}
//remove food item 
const removeFood = async (req,res)=>{
try{
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`,()=>{})
    await foodModel.findByIdAndDelete(req.body.id);
    res.status(200).json({
       message:"Image delete Successfully" 
    })
}
catch(error){
console.log(error)
}
}

module.exports = {addFood,listFood,removeFood}