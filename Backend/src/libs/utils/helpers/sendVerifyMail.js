import nodeMailer from 'nodemailer'
import randomString from 'randomstring'
import config from '../../../config/config.js'

export const sendVerifyMail =async(email , name , message)=>{
   try {
    const transporter = nodeMailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        requireTLS:true,
        auth:{
            user:config.EMAIL,
            pass:config.PASSWORD
        }
        
    })

    let  otp = randomString.generate({ length: 4, charset: "numeric" });
    const mailOptions = {
        from:config.EMAIL,
        to:email,
        subject: `${message}`,
            html: `<p>Hello ${name},</p>
            <p>Welcome to QUICKWORK!</p>
            <p>To complete your registration, please use the following verification code:</p>
            <h2 style="background-color: #f0f0f0; padding: 10px; border-radius: 5px;">${otp}</h2>
            <p>This code will expire in a short while, so be sure to use it promptly.</p>
            <p>If you didn't request this verification, you can safely ignore this message.</p>
            <p>Thank you!</p>`
    }

    transporter.sendMail(mailOptions, function(error,info){
        if(error){
            console.log(error);
        }else{
            console.log("Email has been sent:-",info.response);
        }
    })

    return otp

   } catch (error) {
     console.log(error.message);
   }
}