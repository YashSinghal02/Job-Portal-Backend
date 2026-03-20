import express from "express";
import { postCompany, getCompany,getCompanyById,editCompany,deleteCompany } from "../Controllers/company.controller.js"
import asyncHandler from "../Middlewares/asyncHandler.js";
import { authCheck } from "../Middlewares/authCheck.js";
import { roleCheck } from "../Middlewares/roleCheck.js";


const companyRoute=express.Router();

companyRoute.post("/",authCheck, roleCheck("employer"), asyncHandler(postCompany));
companyRoute.get("/", asyncHandler(getCompany));
companyRoute.get("/:companyId", asyncHandler(getCompanyById));
companyRoute.put("/:companyId",authCheck, roleCheck("employer"), asyncHandler(editCompany));
companyRoute.delete("/:companyId",authCheck, roleCheck("employer"), asyncHandler(deleteCompany));



export default companyRoute
