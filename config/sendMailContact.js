require('dotenv').config();
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SANDGRID_APIKEY); 
const sendActivityEmail=(email)=>
{
  console.log(email);
sgMail
  .send({
    to: email, // Change to your recipient
    from: 'dbcentre001@gmail.com', // Change to your verified sender
    subject: 'Your Query',
    text: `We recieved your message and will get to you as soon as possible!!!`,
  })
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
}
module.exports=sendActivityEmail;