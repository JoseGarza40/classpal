const mailer= require('nodemailer');

const jwt=require('jsonwebtoken')

//Accessing variables set up
require("dotenv").config();

// Sets transport settings for SMTP service
let transportOptions={
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USERNAME,
        pass:process.env.EMAIL_PASS,
    }
}
//Function to send email
let sendMail=(recipient)=>{

    const token= jwt.sign({recipient}, process.env.TOKEN, {expiresIn: '1d'});


    //Prepares email to be sent
    let mailOptions={
        from:'classpal21@gmail.com',
        to:recipient,
        subject:'Verify your email',
        html:`<h1>TESTING</h1><br><h1>VERIFY YOUR EMAIL AT FOLLOWING LINK</h1><br><p>${process.env.URL}/auth/activate/${token}</p>`
    }

    //Provides declared settings to tranport obj
    let transport= mailer.createTransport(transportOptions);

    //Send mail
    transport.sendMail(mailOptions, (err, info)=>{
        if(err){
            console.log(err);
            console.log(mail_options.to);
        }else{
            console.log(info);
        }
    })
}

sendMail('jose.garza40@utrgv.edu');

module.exports=sendMail;