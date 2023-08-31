const nodemailer=require('nodemailer')
const {EMAIL,PASSWORD}=require('../env')

const reportBug=(req,res)=>{
    const {userEmail,userName,bugTitle,bugDescription,browserUsed,dateTime}=req.body
    const date= new Date()
    try{
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
            from:userEmail,
            replyTo:userEmail,
            to:EMAIL,
            subject:"Reporting a System Bug",
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
                    <h2>A system bug have been encountered</h2>
                    <h4>Hello inspire TEAM,</h4>
                    <p>
                        <h4>Bug Title:</h4>${bugTitle}
                    </p>
                    <p>
                        <h4>Bug Description:</h4>${bugDescription}
                    </p>
                    <p>
                        <h4>Browser Used:</h4>${browserUsed}
                    </p>
                    <p class="greetings">
                        <p>Thanks,</p>
                        <p>${userName}</p>
                    </p>
                    <p>
                        <h4>Date and Time:</h4>${dateTime}
                    </p>
            
                </div>
                
                
            </body>
            </html>
            
        `}  

        
        let confirmationMessage={
            from:EMAIL,
            to:userEmail,
            subject:"Bug Report Aknowledgement",
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
                    <h2>Aknoledgement of Reported Bug</h2>
                    <h4>Hello ${userName},</h4>
                    <p>
                        This email confirms that we have recieved your bug report. The inspire TEAM will be working to fix this bug.
                        Incase you are needed for further assistance, the inspire TEAM will contact you.
                    </p>
                    <p class="greetings">
                        <p>Thanks,</p>
                        <p>The inspire Team</p>
                        <p>${date}</p>
                    </p>
            
                </div>
                
                
            </body>
            </html>
            
        `}  
        
        transporter.sendMail(message).then(()=>{
            transporter.sendMail(confirmationMessage).then(()=>{
            return res.status(201).json({
                message:'Your Report have been send successfully. A confirmation will be sent to your email'
            })
        })
        }).catch(error=>{
                return res.status(500).json({error})
            })
    }
    catch(err){
        console.log(err)
    }
}


const reportProblem=(req,res)=>{
    const {userEmail,userName,problemDescription,problemDeviceBrowser,problemDate,problemError,problemSteps,problemfileName}=req.body
    console.log(req.file.path)
    console.log(problemfileName)
    const date= new Date()

    try{
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
            from:userEmail,
            replyTo:userEmail,
            to:EMAIL,
            subject:"Reporting a Problem",
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
                    <h2>A problem have been encountered</h2>
                    <h4>Hello inspire TEAM,</h4>
                    <p>
                        <h4>Program Description:</h4>${problemDescription}
                    </p>
                    <p>
                        <h4>Device and Browser:</h4>${problemDeviceBrowser}
                    </p>
                    <p>
                        <h4>Steps to problem:</h4>${problemSteps}
                    </p>
                    <p>
                        <h4>Error Generated:</h4>${problemError}
                    </p>
                    <p class="greetings">
                        <p>Thanks,</p>
                        <p>${userName}</p>
                    </p>
                    <p>
                        <h4>Date and Time:</h4>${problemDate}
                    </p>
                </div>
                
                
            </body>
            </html>
            
        `,
        attachments:[
            {
                filename:`${problemfileName}`,
                path: `${req.file.path}`,
            }
        ],  
    }  

        
        let confirmationMessage={
            from:EMAIL,
            to:userEmail,
            subject:"Problem Report Aknowledgement",
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
                    <h2>Aknoledgement of Reported Problem</h2>
                    <h4>Hello ${userName},</h4>
                    <p>
                        This email confirms that we have recieved your problem report. The inspire TEAM will be working to solve this problem.
                        Incase you are needed for further assistance, the inspire TEAM will contact you.
                    </p>
                    <p class="greetings">
                        <p>Thanks,</p>
                        <p>The inspire Team</p>
                        <p>${date}</p>
                    </p>
            
                </div>
                
                
            </body>
            </html>
            
        `}  
        
        transporter.sendMail(message).then(()=>{
            transporter.sendMail(confirmationMessage).then(()=>{
            return res.status(201).json({
                message:'Your Problem have been send successfully. A confirmation will be sent to your email'
            })
        })
        }).catch(error=>{
                return res.status(500).json({error})
            })
    }
    catch(err){
        console.log(err)
    } 
}

module.exports={
    reportBug,
    reportProblem
}