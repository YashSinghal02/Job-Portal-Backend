import express from "express";
import { jobcardget, jobPost,deleteJob,editJob,getJobById,getAllJobs } from "../Controllers/jobcreated.controller.js";
import asyncHandler from "../Middlewares/asyncHandler.js";
import { authCheck } from "../Middlewares/authCheck.js";
import { upload } from "../Service/storage.js";
import { roleCheck } from "../Middlewares/roleCheck.js";




const employerRoute=express.Router();

// jobcreate
employerRoute.post("/jobs/:userId",authCheck, roleCheck("employer"), asyncHandler(jobPost));

// getAllJobs
employerRoute.get("/jobs", asyncHandler(getAllJobs));

// JOb Card get
// employerRoute.get("/jobs",asyncHandler(jobcardget));

// Job Delete
employerRoute.delete("/jobs/:jobid",authCheck, roleCheck("employer"),asyncHandler(deleteJob));

// Job Edit
// employerRoute.put("/jobs/:jobid",authCheck,asyncHandler(editJob));
employerRoute.put("/jobs/:jobid", authCheck, roleCheck("employer"), upload.single("logo"), asyncHandler(editJob));

// Get One Job By ID
employerRoute.get("/jobs/:id",asyncHandler(getJobById));



export default employerRoute
