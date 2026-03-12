import express from "express";
import { jobcardget, jobPost,deleteJob,editJob,getJobById } from "../Controllers/jobcreated.controller.js";
import asyncHandler from "../Middlewares/asyncHandler.js";

const employerRoute=express.Router();

// jobcreate
employerRoute.post("/jobs/:userId", asyncHandler(jobPost));

// JOb Card get
employerRoute.get("/jobs",asyncHandler(jobcardget));

// Job Delete
employerRoute.delete("/jobs/:jobid",asyncHandler(deleteJob));

// Job Edit
employerRoute.put("/jobs/:jobid",asyncHandler(editJob));

// Get One Job By ID
employerRoute.get("/jobs/:id",asyncHandler(getJobById));



export default employerRoute
