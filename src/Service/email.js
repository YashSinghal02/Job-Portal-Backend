import nodemailer from "nodemailer";

export const SendEmail = async (receiver, subject, template) => {
  try {
    // ✅ Create transporter INSIDE function (important fix)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Debug logs (remove later)
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log(
      "EMAIL_PASS:",
      process.env.EMAIL_PASS ? "Loaded" : "Missing"
    );

    // ✅ Verify connection (optional but useful)
    await transporter.verify();

    console.log("✅ SMTP Server is ready");

    // ✅ Send email
    const info = await transporter.sendMail({
      from: `"HireBase" <${process.env.EMAIL_USER}>`,
      to: receiver,
      subject: subject,
      html: template,
    });

    console.log("✅ Email sent:", info.messageId);
    return true;

  } catch (error) {
    console.log("❌ Email Error:", error.message);

    // ✅ VERY IMPORTANT: don't crash server
    return false;
  }
};

// Add try catch
// import nodemailer from "nodemailer"
// import { otpTemplate } from "../Templates/otptemplate.js";


// // Create a transporter using Ethereal test credentials.
// // For production, replace with your actual SMTP server details.
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // Use true for port 465, false for port 587
// //   It make server our computer to send email otp to other email
//   auth: {
//     user: "hirebase26@gmail.com",
//     pass: "qouahuuvedubtoxo",
//   },
// });



// export const SendEmail=async(receiver,subject,template)=>{
//  const info = await transporter.sendMail({
//     from: '"HireBase" <verify@hirebase.com>',
//     to: receiver,
//     subject: subject,
//     html: template, // HTML version of the message
//   });

//   console.log("Message sent:", info.messageId);

// }