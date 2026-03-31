import { User } from "../Model/user.model.js";
import { SendEmail } from "../Service/email.js";
import { otpTemplate } from "../Templates/otptemplate.js";
import bcrypt from "bcrypt";
import { CustomError } from "../Utils/ErrorClass.js";
import { successHandler } from "../Utils/sucess.js";


// Verify Email
const verifyemail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new CustomError(400, "Email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    return successHandler(res, 400, "fail", "Email not found");
  }

  // Generate OTP
  const OTP = Math.floor(Math.random() * 9000 + 1000);

  // Save OTP in DB
  user.otp = OTP;
  await user.save();

  // Send Email
  await SendEmail(email, "Verify OTP", otpTemplate.replace("{otp}", OTP));

  return successHandler(res, 200, "success", "OTP sent successfully");
};



// Verify OTP
const verifyotp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    throw new CustomError(400, "Email and OTP required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError(404, "User not found");
  }

  if (String(user.otp) !== String(otp)) {
    return successHandler(res, 400, "fail", "Invalid OTP");
  }

  // Mark verified
  user.isVerified = true;
  user.otp = null;

  await user.save();

  return successHandler(res, 200, "success", "OTP verified");
};



// Change Password
const changepassword = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError(400, "Email and password required");
  }

  const user = await User.findOne({ email });

  if (!user || !user.isVerified) {
    return successHandler(res, 400, "fail", "Not authorized");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;
  user.isVerified = false; // reset again

  await user.save();

  return successHandler(res, 200, "success", "Password changed successfully");
};

export { verifyemail, verifyotp, changepassword };