import express from "express";
import { editCompanyProfile,getCompanyProfile } from "../Controllers/companyProfileController.js";
import asyncHandler from "../Middlewares/asyncHandler.js";
import { authCheck } from "../Middlewares/authCheck.js";
import { roleCheck } from "../Middlewares/roleCheck.js";
import { actionLimiter } from "../Utils/limiter.js";


const companyProfileRoute = express.Router();

companyProfileRoute.put("/", authCheck, roleCheck("employer"),actionLimiter, asyncHandler(editCompanyProfile));

companyProfileRoute.get("/",authCheck,roleCheck("employer"),asyncHandler(getCompanyProfile));

export default companyProfileRoute;