const express =require('express');
const app=express();
const connectDB =require('./config/dbConn');
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser')
const path=require('path')

require('dotenv').config({path:path.join(__dirname,'..','.env')});

const PORT =process.env.PORT||5000;

connectDB();

//middleware to get data from parsed json
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())

//middleware to set up routes
app.use('/user', require('./routes/users'));
app.use('/profile', require('./routes/profile'));
app.use('/inspiration', require('./routes/inspirations'));
app.use('/comment', require('./routes/comment'));
app.use('/like', require('./routes/likes'));
app.use('/bookmark', require('./routes/bookmark'));
app.use('/inspirer', require('./routes/inspirers'));
app.use('/email', require('./routes/resetSubmitEmail'));
app.use('/help', require('./routes/helpSupport'));
app.use('/notification', require('./routes/notification'));
app.use('/counter', require('./routes/notificationCounter'));

// creating a mongo db connection to the cloud
mongoose.connection.once("open",()=>{
    console.log("connected to mongodb");
    app.listen(PORT,()=>{
        console.log(`the server is running on PORT ${PORT}`)
    })
})

