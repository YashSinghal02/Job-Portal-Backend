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
    // throw new CustomError(400, "Email already exists");
    return successHandler(res,400,"fail","Email already exists");
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
 if (String(user.otp) !== String(otp)) {
    // throw new CustomError(400, "Invalid OTP");
      return successHandler(
    res,
    400,
    "fail",
    "Invalid OTP"
  );
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
    // throw new CustomError(404, "Cannot find email, try signing up");
   return successHandler(res,400,"fail","Cannot find email, try signing up");
  }

  const result = await bcrypt.compare(password, user.password);

  if (!result) {
    // throw new CustomError(400, "Incorrect Password");
      return successHandler(res,400,"fail","Incorrect Password");
  }

  // jwt token for cookie
  const data = { id: user._id, role: user.role,email:user.email,name:user.name,phone:user.phone};
  // const accessToken = jwt.sign(data, "qwer", { expiresIn: "15m" });
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
  expiresIn: "15m",
    jwtid: Date.now().toString()
});
  console.log(accessToken);

  // const refreshToken = jwt.sign(data, "asd", { expiresIn: "30d" });
  const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
  expiresIn: "30d",
});

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
    const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET); // verify refresh token
    // generate new access token with proper expiration
    const accessToken = jwt.sign(
      {  id: decoded.id,
        role: decoded.role,
        email: decoded.email,
        name: decoded.name,
        phone: decoded.phone, },
       process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m",
         jwtid: Date.now().toString() //  unique id
       }
    );
console.log("Retrying RefreshToken API")
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

// changePassword FOr Profile 
const changePasswordProfile = async (req, res) => {
  const { newPassword } = req.body;

  if (!newPassword) {
    throw new CustomError(400, "Password is required");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    throw new CustomError(404, "User not found");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  await user.save();

  successHandler(res, 200, "success", "Password updated successfully");
};

export { signUp, login, otpsend, testController, refreshtokenController,getUserData,changePasswordProfile };

// "When the user logs in, the server first checks whether the email and password are valid. If they are correct, the server creates an access token containing user information like the user's ID and role. The access token is short-lived, for example 15 minutes, and is sent to the client in the response header. The server also creates a refresh token with a longer expiry, such as 30 days, and stores it in a cookie.

// (Part-2)
// The authorization flow starts after the user logs in successfully. The backend verifies the user's credentials and generates JWT tokens. JWT authentication generally uses two tokens: an access token and a refresh token.

// The access token has a short expiry time, such as 10 or 15 minutes. Its purpose is to access protected APIs. Because it expires quickly, even if someone steals it, the damage is limited.

// The refresh token has a longer expiry time, for example 30 days. It is used only to generate a new access token when the old one expires.

// In my project, I send the access token in the Authorization header and the refresh token in an HTTP cookie. If a token is stored in a cookie, the browser automatically sends it with requests to the same site. If it is stored in local storage, session storage, or memory, the frontend must manually attach it to the Authorization header for each protected request.

// When the access token expires, the backend returns a 401 Unauthorized response. On the frontend, an Axios interceptor catches this 401 response and automatically calls the refresh token API.

// The backend reads the refresh token from req.cookies and verifies it using the refresh token secret. If the refresh token is valid, the backend generates a new access token and sends it back to the frontend. The frontend stores the new access token and retries the original request automatically. Because of this, the user usually does not notice that the access token expired and can continue using the application without logging in again.

// This process continues until the refresh token expires, for example after 30 days. Once the refresh token has expired or is invalid, the user must log in again."