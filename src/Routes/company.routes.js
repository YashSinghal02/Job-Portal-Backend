import express from "express";
import { postCompany, getCompany,getCompanyById,editCompany,deleteCompany } from "../Controllers/company.controller.js"
import asyncHandler from "../Middlewares/asyncHandler.js";

const companyRoute=express.Router();

companyRoute.post("/", asyncHandler(postCompany));
companyRoute.get("/", asyncHandler(getCompany));
companyRoute.get("/:companyId", asyncHandler(getCompanyById));
companyRoute.put("/:companyId", asyncHandler(editCompany));
companyRoute.delete("/:companyId", asyncHandler(deleteCompany));



export default companyRoute
