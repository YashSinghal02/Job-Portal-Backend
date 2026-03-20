import express from 'express'
import { applyJob,getAppliedJobs } from '../Controllers/appliedjobs.controllers.js'
import { authCheck } from '../Middlewares/authCheck.js';
import asyncHandler from '../Middlewares/asyncHandler.js';
import { roleCheck } from '../Middlewares/roleCheck.js';


const ApplyRoute= express.Router();

ApplyRoute.post("/:jobid/apply", authCheck,roleCheck("employee"), asyncHandler(applyJob));

ApplyRoute.get("/applied", authCheck,roleCheck("employee"),asyncHandler(getAppliedJobs));


export default ApplyRoute