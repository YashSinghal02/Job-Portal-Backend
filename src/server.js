import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { dbconnect } from "./Database/dbconnect.js";
import testRoute from "./Routes/test.routes.js";
import UserRoute from "./Routes/user.routes.js";
import cookieParser from "cookie-parser";
import employerRoute from "./Routes/job.routes.js";
import ProfileRoute from "./Routes/profile.routes.js";
import companyRoute from "./Routes/company.routes.js";
import ApplyRoute from "./Routes/appliedjobs.routes.js";
import SaveRoute from "./Routes/savedjobs.routes.js";
// import { upload } from "./Service/storage.js";
import companyProfileRoute from "./Routes/companyProfile.routes.js";
import UploadRoute from "./Routes/upload.routes.js";



// App is created
const app = express();
// Database Connected
dbconnect();

console.log("env port:", process.env.PORT);
// Midddlewalre
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://hirebase-app.vercel.app"
    ],
    credentials: true,
    exposedHeaders: ["Authorization"],
  })
);
// Header config
app.use((req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "https://hirebase-app.vercel.app");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Expose-Headers", "Authorization");
  next();
});

// default get method
app.get("/",(req,res)=>{
  res.send("Server is Running")
});

// cookieParser in headder
app.use(cookieParser());

// Frontend data come  in JS to convert in object we use it(Body)
app.use(express.json({ extended: true }));

// means all environment variables of your Node app
const PORT = process.env.PORT || 3001;

// app.get("/server-status",(req,res)=>{
// res.send("Srver is running");
// })

// Routes
app.use("/api/test", testRoute);

// userRoutes
app.use("/api/user", UserRoute);

// Apply Route
app.use("/api/jobs", ApplyRoute);

// Save Route
app.use("/api/savedjobs", SaveRoute);

// employerRoute
app.use("/api/employer", employerRoute);

// Company Route
app.use("/api/companies", companyRoute);

// Profile Route
app.use("/api/profile", ProfileRoute);

// CompanyProfile Route
app.use("/api/company-profile", companyProfileRoute);

// fileUpload
app.use("/api/uploads", UploadRoute);


// Error Handler Middeware
// app.use((err, req, res, next) => {
//   // console.log(err);//for error debugging in terminal
//   console.log("Error Handler Middeware:", err.message); //for error debugging in terminal by particular message give
//   const statusCode = err.statusCode || 500;
//   res.status(statusCode).json({
//     message: err.message || "Internal Server Error",
//   });
// });

app.use((err, req, res, next) => {
  console.log("Full Error:", err);   // 🔥 see full error
  console.log("Error Message:", err?.message);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err?.message || "Internal Server Error",
  });
});

// It start the server an then show messagle on terminal
app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
