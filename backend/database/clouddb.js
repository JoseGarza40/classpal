const {MongoClient}=require('mongodb');
const {v4:uuidv4}=require('uuid');
const bcrypt=require("bcrypt");

//Environment variables set up
require("dotenv").config();

let user=process.env.USER;
let pass=process.env.PASS;
console.log(user, pass);

//Class containing db operations
class Atlas{

    // Returns object of user if exists in database
    async userExists(client, email){
        const exists= await client.db("classpal-backend").collection("users").findOne({email:email})
        exists?true:false;
        return exists

    }
    //Retrieves single user from database
    async singleUser(client, email){
        const user= await client.db("classpal-backend").collection("users").findOne({email:email})
        if(user==null){
            return false;
        }
        return user;
    }

    //Checks if user exists, compares plain text password to hash saved in db or display error message
    async authenticate(client, email, password){
        const exists=await this.userExists(client, email)
        const user= await this.singleUser(client, email)
        let matches=await bcrypt.compareSync(password, user.password);

        if(exists==false||user==null||matches!=true){
            return false;
        }else{
            return true;
        }
    }

    //Creates user in database when passed object
    async register (client, user){
        const r= await client.db("classpal-backend").collection("users").insertOne(user)
        console.log(r.insertedId)
    }

    //Deletes single document when provided an id
    async delete (client, id){
        await client.db("classpal-backend").collection("users").deleteMany({_id:id})
        console.log('Deleted successfully')

    }

    //Gets array of all classmates with same major
    async getClassmatesFromMajor(client, major){
        let all=await client.db("classpal-backend").collection("users").find({major:major}).toArray()
        console.log(all)
        return all;
    }

    // async getClassmatesFromCourse(client, course){
    //     let all=await client.db("classpal-backend").collection("users").aggregate([
    //         {$match:{courses.course0.name:course}}
    //     ]).toArray()
    //     console.log(all)
    //     all.forEach((x, i) => console.log(x.courses.course0.name));

    // }

    async getall(client){
        let all=await client.db("classpal-backend").collection("users").find();
        return all
    }

}

//Entry point to interact with MongoAtlass
async function main(){

    const uri = `mongodb+srv://${user}:${pass}@classpal-backend.75bry.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
    const client = new MongoClient(uri);
    await client.connect();
    
    //Atlas object
    const a= new Atlas();

    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        //Make the appropriate DB calls
        // await a.register(client,
        //     {
        //         _id:uuidv4(),
        //         email:"jose.garza40@utrgv.edu",
        //         name:"Sample user", 
        //         lastname:"sample lastname",
        //         password:await bcrypt.hash("samplepass",10),
        //         major:"Computer engineering",
        //         courses:{
        //              course0:{
        //                 name:"CSCI 1101",
        //                 crn:"1101",
        //                 instructor:"Jose Poveda",
        //                 campus:"Edinburg",
        //                 modality:"face-to-face"
        //             },
        //         }
        //     });

        // await a.login(client,"samplestudent@utrgv.edu" )
        // await a.userExists(client,"jose.garza40@utrgv.edu" )
        // await a.authenticate(client,"samplestudent@utrgv.edu", "samplepass" )
        // await a.authenticator(client,"sample@utrgv.edu", "samplepass" )
        // await a.delete(client, 'caa3e8d6-eeb9-47d4-8b6b-e3a2fcd70100')
        // await a.getClassmatesFromMajor(client,"Computer engineering")
        // await a.getClassmatesFromCourse(client, "Computer engineering")
        // console.log('User exists: ',await a.singleUser(client, "myrvil.vilchi@utrgv.edu"))
        // console.log('Login matches: ',await a.authenticate(client,"myrvil.vilchis01@utrgv.edu", "HarryStyles09" ))


    } catch (e) {
        console.error(e);}
    // } finally {
    //     await client.close();
    // }
}
main().catch(console.error);



module.exports=Atlas;