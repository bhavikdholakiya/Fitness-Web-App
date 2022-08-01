require('dotenv').config();
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SANDGRID_APIKEY); 
// const sendActivityEmail=(email,activity,progress)=>
// {
//   console.log(email,activity,progress);
// sgMail
//   .send({
//     to: email, // Change to your recipient
//     from: 'dbcentre001@gmail.com', // Change to your verified sender
//     subject: 'Pending Activity',
//     text: `Come On!!!! You are only ${100-progress}% away from Completing ${activity}`,
//   })
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })
// }
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(email,message) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "dbcentre001@gmail.com", // generated ethereal user
      pass: "12345678@dbj", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'dbcentre001@gmail.com', // sender address
    to: email, // list of receivers
    subject: "Your Progress", // Subject line
    text: message  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main().catch(console.error);
module.exports=main;