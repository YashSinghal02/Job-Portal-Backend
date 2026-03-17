import { User } from "../Model/user.model.js";
import { SendEmail } from "../Service/email.js";
import { otpTemplate } from "../Templates/otptemplate.js";
import { CustomError } from "../Utils/ErrorClass.js";
import bcrypt from "bcrypt";
import { successHandler } from "../Utils/sucess.js";
import jwt from "jsonwebtoken";
// import status from "daisyui/components/status/index.js";

// Post
const signUp = async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  console.log(req.body);

  if (!name || !email || !phone || !password || !role) {
    throw new CustomError(400, "All Fileds Are Required");
  }
  const user = await User.findOne({ email });
  if (user) {
    throw new CustomError(400, "Email already exists");
  }

  // creating OTP
  const OTP = Math.floor(Math.random() * 9000 + 1000);
  // hash
  const hashedPassword = await bcrypt.hash(password, 10);
  const createUser = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
    role,
    otp: OTP,
  });

  // Sending Email otp
  SendEmail(email, "Verify OTP", otpTemplate.replace("{otp}", OTP));
  // res.status(201).json({ message: "OTP Send Successfully" });
  successHandler(res, 201, "success", "OTP Send Successfully");
};

// OTP

const otpsend = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    throw new CustomError(400, "Email or OTP Not Found");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError(404, "User not found");
  }
  if (user.otp !== otp) {
    throw new CustomError(400, "Invalid OTP");
  }
  user.isVerified = true;
  user.otp = null;
  await user.save();
  // res.status(200).json({message:"OTP is Verifed"})
  successHandler(res, 200, "success", "OTP is Verifed");
};

// POST - Login
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email || !password) {
    throw new CustomError(400, "All Fileds Are Required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError(404, "Cannot find email, try signing up");
  }

  const result = await bcrypt.compare(password, user.password);

  if (!result) {
    throw new CustomError(400, "Incorrect Password");
  }

  // jwt token for cookie
  const data = { id: user._id, role: user.role,email:user.email,name:user.name,phone:user.phone};
  const accessToken = jwt.sign(data, "qwer", { expiresIn: "15m" });
  console.log(accessToken);

  const refreshToken = jwt.sign(data, "asd", { expiresIn: "30d" });

  // set jwt token in cookies
  // res.cookie("token",refreshToken)
  // refresh token for long time store in cookie
  res.cookie("refreshToken", refreshToken);

  // CORS expose-header issues
  // res.header("X-Project-name","Job-Portal")

  // ***********//
  // res.status(200).json({status:"Success",accessToken})
  
   res.header("Authorization", `Bearer ${accessToken}`);

     // ***********//

  // Header Based
  // Access token for short time
  // res.header("Authorization", accessToken);


  successHandler(res, 200, "success", "Login Successful", data);
};

// Refersh Token and Access Token Cycle
const refreshtokenController = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).json({ status: "Failed", message: "No Refresh Token found" });
  }

  try {
    const decoded = jwt.verify(refreshToken, "asd"); // verify refresh token
    // generate new access token with proper expiration
    const accessToken = jwt.sign(
      {  id: decoded.id,
        role: decoded.role,
        email: decoded.email,
        name: decoded.name,
        phone: decoded.phone, },
      "qwer",
      { expiresIn: "15m" }
    );

    // send it in header
    res.header("Authorization", `Bearer ${accessToken}`);
    successHandler(res, 200, "success", "Access Token Set Successfully");

  } catch (err) {
    return res.status(401).json({ status: "Failed", message: "Refresh token expired" });
  }
};

// testController
const testController = async (req, res) => {
  console.log(req.user);
  res.send("You Are Authenticated");
};


// getJobs  of particular user 

const getUserData=async(req,res)=>{
  const{userId}=req.params;
  console.log(userId);
  if (!userId) {
    throw new CustomError(400,"User Id Not Found")
  }

  const userData=await User.findById(userId).populate("createdJobs");

    successHandler(res, 201, "success", "Job Fetched Successfully",userData);


}

// File Upload
// const fileUpload = async (req, res) => {
//   console.log("Upload Request Received");

//   console.log("File Object:", req.file);
//   console.log("File URL:", req.file.path);
//   console.log("Public ID:", req.file.filename);

//   if (!req.file) {
//     throw new Error("File not uploaded");
//   }

//   res.status(200).json({
//     message: "File uploaded successfully",
//     url: req.file.path,
//     public_id: req.file.filename,
//   });
// };

export { signUp, login, otpsend, testController, refreshtokenController,getUserData };

