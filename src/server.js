import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { dbconnect } from "./Database/dbconnect.js";
import testRoute from "./Routes/test.routes.js";
import UserRoute from "./Routes/user.routes.js";
import cookieParser from "cookie-parser"
import employerRoute from "./Routes/job.routes.js";
import ProfileRoute from "./Routes/profile.routes.js";
import companyRoute from "./Routes/company.routes.js";



dotenv.config();

// App is created
const app=express();
// Database Connected
dbconnect();

console.log("env port:",process.env.PORT);
// Midddlewalre
app.use(cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true
}));

// Header config
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
   res.setHeader("Access-Control-Expose-Headers", "Authorization");
  next();
});


// cookieParser in headder
app.use(cookieParser())

// Frontend data come  in JS to convert in object we use it(Body)
app.use(express.json({extended:true}));

// means all environment variables of your Node app
const PORT=process.env.PORT || 3001

// app.get("/server-status",(req,res)=>{
// res.send("Srver is running");
// })

// Routes
app.use("/api/test",testRoute)

// userRoutes
app.use("/api/user",UserRoute)

// employerRoute
app.use("/api/employer",employerRoute)

// Company Route
app.use("/api/companies",companyRoute)

// Profile Route
app.use("/api/profile",ProfileRoute)

// Error Handler Middeware
app.use((err,req,res,next)=>{
    // console.log(err);//for error debugging in terminal
    console.log("Error Handler Middeware:",err.message);//for error debugging in terminal by particular message give
    const statusCode=err.statusCode|| 500;
    res.status(statusCode).json({
        message:err.message || "Internal Server Error",
    });
});

// It start the server an then show messagle on terminal
app.listen(PORT,()=>{
    console.log(`Server is running on PORT:${PORT}`)
})