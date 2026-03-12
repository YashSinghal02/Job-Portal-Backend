import nodemailer from "nodemailer"
import { otpTemplate } from "../Templates/otptemplate.js";


// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
//   It make server our computer to send email otp to other email
  auth: {
    user: "hirebase26@gmail.com",
    pass: "qouahuuvedubtoxo",
  },
});

// Send an email using async/await
// (async () => {
//   const info = await transporter.sendMail({
//     from: 'HireBase',
//     to: "y377075@gmail.com",
//     subject: "OTP",
//     html: otpTemplate, // HTML version of the message
//   });

//   console.log("Message sent:", info.messageId);
// })();

export const SendEmail=async(receiver,subject,template)=>{
 const info = await transporter.sendMail({
    from: '"HireBase" <verify@hirebase.com>',
    to: receiver,
    subject: subject,
    html: template, // HTML version of the message
  });

  console.log("Message sent:", info.messageId);

}