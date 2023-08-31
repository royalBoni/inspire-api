const mongoose=require('mongoose');
const users=require('../model/users');
const nodemailer=require('nodemailer')
const nodemailerConfig=require('../config/nodemailer')
const {EMAIL,PASSWORD}=require('../env')
const jwt = require('jsonwebtoken');

const handleSubmitEmail=async(req,res)=>{
    const {email}=req.body;
    try{
        const findEmail =await users.findOne({userEmail:email});
        if(findEmail.length===0){
            return res.status(401).json({message:'there is no user with this email'})
        }
        else{
             //JWT
        const accessToken=jwt.sign(
            {"userEmail":findEmail.userEmail},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'4m'}
        );

           /*  return res.status(200).json({message:'reset link have been sent to this email'}) */
             //creating a config object
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
                subject:"We received a request to update your password",
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
                
                        a{
                            text-decoration: none;
                            color:rgb(233, 216, 214) ;
                        }
                
                        .button{
                            background-color: rgb(63, 4, 50); 
                            padding: 0.2rem 1rem;
                            margin-left: auto;
                            margin-right: auto;
                            left: 0;
                            right: 0;
                            text-align: center;
                            border-radius: 50px;
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
                        <h2>Change your password</h2>
                        <h4>Hello ${findEmail.userName}</h4>
                        <p>
                            We recieved a request that you want to update your password. You can do this by clicking on the button below.
                            You will be asked to enter a new password, then your account will be verified.
                        </p>
                        <p>This request will expire in 4 mins</p>
                        <div class="button"><a href=http://localhost:3000/change/${findEmail.userEmail}/${accessToken}><p>Update Password</p></a></div>
                        <p>If you didnt make this request, you dont need to do anything</p>
                        <p class="greetings">
                            <p>Thanks,</p>
                            <p>The inspire Team</p>
                        </p>
                
                    </div>
                    
                    
                </body>
                </html>
                
            `
        }

            transporter.sendMail(message).then(()=>{
                return res.status(201).json({
                    message:"you should recieve an email"
                })
            }).catch(error=>{
                    return res.status(500).json({error})
                })
                }    
        }
    catch(err){
        console.log(err)
        return res.status(400).json({message:`${err}`})
        } 
}

const handleChangePassword=async(req,res)=>{
    console.log('we passed throgh jwt')
}

module.exports={
    handleSubmitEmail,
    handleChangePassword
}