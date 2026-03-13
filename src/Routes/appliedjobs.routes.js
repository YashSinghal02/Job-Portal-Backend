import express from 'express'
import { applyJob,getAppliedJobs } from '../Controllers/appliedjobs.controllers.js'
import { authCheck } from '../Middlewares/authCheck.js';
import asyncHandler from '../Middlewares/asyncHandler.js';


const ApplyRoute= express.Router();

ApplyRoute.post("/:jobid/apply", authCheck, asyncHandler(applyJob));

ApplyRoute.get("/applied", authCheck, asyncHandler(getAppliedJobs));


export default ApplyRoute