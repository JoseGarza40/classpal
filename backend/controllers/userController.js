const users={}
const cloud = require('../database/clouddb')
const {MongoClient}=require('mongodb');
const {v4:uuidv4}=require('uuid');
const bcrypt=require("bcrypt");

//Environment variables set up
require("dotenv").config();

let user=process.env.USER;
let pass=process.env.PASS;

const atlas= new cloud()
const uri = `mongodb+srv://${user}:${pass}@classpal-backend.75bry.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
client.connect()



users.welcome=async (req, res)=>{
    res.json("Welcome to Classpal");
}

// users.classmatesMajor=async (req, res)=>{
//     console.log(req.body.major)
//     const majorRoster=await atlas.getClassmatesFromMajor(client,req.body.major);
//     res.json(majorRoster)
// }
users.classmatesMajor=async (req, res)=>{
    console.log(req.body.major)
    const majorRoster=await atlas.getClassmatesFromMajor(client,req.query.major);
    res.json(majorRoster)
}

// users.classmatesCourse=async (req,res)=>{}

users.register= async (req, res)=>{
    const body= req.body;  
    try {
        await atlas.register(client,
        { 
            _id:uuidv4(),
            email:body.email,
            name:body.name, 
            lastname:body.lastname,
            password:await bcrypt.hash(body.password,10),
            major:body.major,
            courses:body.courses
        })
    } catch (error) {
        console.log(error)
    }finally{
        client.close();
    }

}
// users.update= async (req, res)=>{}

users.delete= async (req, res)=>{
    const body= req.body;
    try {
        await atlas.delete(client,body._id)
    } catch (error) {
        console.log(error)
    }finally{
        client.close();
    }
}


module.exports=users;