const initial={}
const cloud = require('../database/clouddb')
const {MongoClient}=require('mongodb');
const {v4:uuidv4}=require('uuid');
const bcrypt=require("bcrypt");
const { json } = require('express');

//Environment variables set up
require("dotenv").config();

let user=process.env.USER;
let pass=process.env.PASS;

//Connecting to Mongo Atlas
const atlas= new cloud()
const uri = `mongodb+srv://${user}:${pass}@classpal-backend.75bry.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
client.connect()

initial.getall=async(req,res)=>{
    let classmates=await atlas.getall(client);
    res.json(classmates);
}

//Authenticates users comparing encrypted password in database to plain text password in request
initial.login=async(req,res)=>{
    const body= req.body;
    // console.log(body.email, body.password)
    let loginMatches= await atlas.authenticate(client, body.email, body.password);
    
    if(loginMatches){
        res.json(`Welcome ${body.email}`)
    }else{
        res.json(`Wrong login`)
    }
}

//Register route for new users
initial.register= async (req, res)=>{
    const body= req.body; 
    const exists=await atlas.userExists(client, body.email)
    if(!exists){
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
            }
            )
            res.json(`${body.email} saved successfully`);
        } catch (error) {
            console.log(error)
            res.json(error)}
        // }finally{
        //     client.close();
        // }
    }else{
        res.json("username or email already exists")
    }

}

initial.activateAccout=(req,res)=>{


}


//Deletes user given ID
initial.delete= async (req, res)=>{
    const body= req.body;
    const url=req.params;
    try {
        await atlas.delete(client,url.id)
        res.json(`${url.id} was deleted successfully`)
    } catch (error) {
        console.log(error)
    }
}

module.exports=initial;