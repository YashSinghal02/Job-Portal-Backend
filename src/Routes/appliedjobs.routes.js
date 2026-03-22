import express from 'express'
import { applyJob,getAppliedJobs, getApplicantsForEmployer } from '../Controllers/appliedjobs.controllers.js'
import { authCheck } from '../Middlewares/authCheck.js';
import asyncHandler from '../Middlewares/asyncHandler.js';
import { roleCheck } from '../Middlewares/roleCheck.js';


const ApplyRoute= express.Router();

ApplyRoute.post("/:jobid/apply", authCheck,roleCheck("employee"), asyncHandler(applyJob));

ApplyRoute.get("/applied", authCheck,roleCheck("employee"),asyncHandler(getAppliedJobs));


// ApplyRoute.get(
//   "/appliedbyemployee",
//   authCheck,
//   asyncHandler(getEmployeeData)
// );

ApplyRoute.get(
  "/applicants",
  authCheck,
  roleCheck("employer"),
  asyncHandler(getApplicantsForEmployer)
);

export default ApplyRoute