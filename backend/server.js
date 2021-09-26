
const express=require("express");
const morgan= require("morgan");

//Calling db on server refresh
const db= require('./database/clouddb')
//Server port
const PORT= process.env.PORT||5000;

//express main object
const app=express();
app.use(express.json());
app.use(morgan('dev'));

//Accessing user endpoints
app.use("/", require('./routes/defaultRoutes'))
app.use("/user", require('./routes/userRoutes'))


//Server startup function
app.listen(PORT, ()=>{
    console.log(`Running server on port ${PORT}`)
})

module.exports=app;