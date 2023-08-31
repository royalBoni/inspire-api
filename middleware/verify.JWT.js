const path =require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config({path:path.join(__dirname,'..','.env')});


const verifyJWT=(req,res,next)=>{
    const authHeader=req.headers['authorization'];
    
    if(!authHeader) return res.sendStatus(401);
    const token = authHeader
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, 
        (err, decoded)=>{
            if(err) return res.status(403).json({message:"this reset link have expired."}) 
            req.user=decoded.username;
            /* res.status(200).json({message:"token is ok"}) */
            next();
        }) 
}

module.exports={verifyJWT}