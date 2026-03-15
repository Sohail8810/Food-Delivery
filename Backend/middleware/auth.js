const jwt = require('jsonwebtoken')

const authMiddleware = async(req,res,next)=>{
const {token} = req.headers;
if(!token){
    return res.status(400).json({
        messsage:"Not Authorized Login Again"
    })
}
try{
    const token_decode = jwt.verify(token,process.env.JWT_SECRET)
    req.body = req.body || {};
    req.body.userId = token_decode.id
    next();
    
}
catch(error){
    console.log(error)
}
}

module.exports = authMiddleware