import { Company } from "../Model/company.model.js";
import { CustomError } from "../Utils/ErrorClass.js";
import { successHandler } from "../Utils/sucess.js";


// Create Company
const postCompany = async (req, res) => {
  const { companyName, website, location, description, logo } = req.body;

  if (!companyName || !website || !location) {
    throw new CustomError(400, "Company Name, Website and Location are required");
  }

  const company = await Company.create({companyName,website,location,description,logo});

  successHandler(res, 201, "success", "Company created successfully", company);
};


// Get All Companies
const getCompany = async (req, res) => {
  const companies = await Company.find();

  successHandler(res, 200, "success", "Companies fetched successfully", companies);
};


// Delete Company
const deleteCompany = async (req, res) => {
  const { companyId } = req.params;

  if (!companyId) {
    throw new CustomError(400, "Company Id is required");
  }

  const company = await Company.findByIdAndDelete(companyId);

  if (!company) {
    throw new CustomError(404, "Company not found");
  }

  successHandler(res, 200, "success", "Company deleted successfully");
};


// Update Company
const editCompany = async (req, res) => {
  const { companyId } = req.params;

  if (!companyId) {
    throw new CustomError(400, "Company Id is required");
  }

  const { companyName, website, location, description, logo } = req.body;

  const company = await Company.findByIdAndUpdate(companyId,{ companyName, website, location, description, logo },{ new: true });
  if (!company) {
    throw new CustomError(404, "Company not found");
  }

  successHandler(res, 200, "success", "Company updated successfully", company);
};


// Get Single Company
const getCompanyById = async (req, res) => {
  const { companyId } = req.params;

  const company = await Company.findById(companyId);

  if (!company) {
    throw new CustomError(404, "Company not found");
  }

  successHandler(res, 200, "success", "Company fetched successfully", company);
};


export {postCompany,getCompany,deleteCompany,editCompany,getCompanyById,};