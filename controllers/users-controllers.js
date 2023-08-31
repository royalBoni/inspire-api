const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const users=require('../model/users');
const nodemailer=require('nodemailer')
const profile = require('../model/profiles')

const {EMAIL,PASSWORD}=require('../env')

const createUser =async(req,res)=>{
    const {email,username,password}=req.body;
    try{
        const findEmail =await users.find({userEmail:req.body.email});
        if(findEmail.length===0){
            const findUserName=await users.find({userName:req.body.username});
            if(findUserName.length===0){
                const hashedPswd=await bcrypt.hash(password,10)
                const newUser= await users.create(
                    {
                        'userEmail':email,
                        'userName':username,
                        'userPassword':hashedPswd
                    }
                )
                return res.status(200).json({userID:newUser._id,userEmail:newUser.userEmail,userName:newUser.userName});
            }
            else{
                return res.status(401).json({message:'user name already used'})
            }
        }
        else{
            return res.status(401).json({message:'email already used'});
        }
        
    }
    catch(err){
        return res.status(400).json({err})
        }   
}

const handleUserserLogin = async(req,res)=>{
    const{email, password}=req.body;
    if(!email || !password)return res.status(400).json({'message':'email and password are required'})
    
    const findUser =await users.find({userEmail:email});
    /* if(!findUser)return res.status(401).send("user name doesnt match"); */  //unauthorised
    if(findUser.length>0){
        const findPass=findUser.find((item)=>item.userEmail===email);
        const match = await bcrypt.compare(password, findPass.userPassword);
        if(match){
        return res.status(200).json({message:findPass._id})
    }

    else{
       return res.status(401).json({message:'incorrect password'})
    } 
        
    }
    else{
        return res.status(401).json({message:'email doesnt match any account'})
    }
}

const handleUserInfo = async(req,res)=>{
    const{id}=req.params;
    console.log(id)
    if(!id)return res.status(400).json({'message':'userID is required'})
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send('invalid id')

    //find user
    const findUser=await users.findById(id);
    if(findUser){
        res.status(200).json({message:
        {
            userEmail:findUser.userEmail,
            userName:findUser.userName
        }
        })
    }
    else{
        res.status(400).json({message:'id doesnt match any user'})
    }
    
    /* if(findUsers.length>0){
        const findUser = findUsers.find((item)=>item._id===id)
        console.log(findUser)
        if(findUser){
        return res.status(200).json({message:findUser})
    }
        
    }
    else{
        return res.status(401).json({message:'email doesnt match any user'})
    } */
}

const editUser=async(req,res)=>{
    const {password,email}=req.body;
    
    try{
    if(!password)return res.status(400).json({message:'password is required'})
    if(!email)return res.status(400).json({message:'email is required'})

    //find user
    const findUser=await users.findOne({userEmail:email});
    
    //checking whether there was a match.
    if(!findUser){
    return res.status(404).json({'message':`no user matches id ${email}`})
    }
        //encrypting user password
        const hashedPswd=await bcrypt.hash(password,10)
        //updating users new password
       const dbResult=await users.findByIdAndUpdate(findUser._id,{
        'userPassword':hashedPswd
        },
            {new:true}
        )
        
        let config={
            service: "gmail",
            auth: {
            user: EMAIL, 
            pass: PASSWORD
            },
        } 
            // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport(config);

        let message={
            from:EMAIL,
            to:email,
            subject:"Your password was set",
            html:`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>HTTP SERVER</title>
            
                <style>
                    .email{
                        padding: 1rem;
                        background-color:rgb(233, 216, 214) ; 
                    }
                    h1{  
                        color: rgb(63, 4, 50);
                        font-style: italic;
                    }
            
                    .greetings{
                        display: grid;
                        gap: 0.5rem;
                    }
                </style>
            </head>
            <body>
                <div class="email">
                    <h1>inspire</h1>
                    <h2>A password was changed for your account</h2>
                    <h4>Hello ${findUser.userName},</h4>
                    <p>
                        This email confirms that you recently changed the password for your account. No further action is required.
                    </p>
                    <p class="greetings">
                        <p>Thanks,</p>
                        <p>The inspire Team</p>
                    </p>
            
                </div>
                
                
            </body>
            </html>
            
        `}  
        
        transporter.sendMail(message).then(()=>{
            return res.status(201).json({
                message:'Password Updated Successfully. Confirmation sent to your email'
            })
        }).catch(error=>{
                return res.status(500).json({error})
            })
    }
    catch(err){
        console.log(err)
        return res.status(400).json({message:err})
    }

}



module.exports={
    createUser,
    handleUserserLogin,
    editUser,
    handleUserInfo
}