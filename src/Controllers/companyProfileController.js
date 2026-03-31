import { User } from "../Model/user.model.js";
import { CompanyProfile } from "../Model/companyProfile.js";
import { CustomError } from "../Utils/ErrorClass.js";
import { successHandler } from "../Utils/sucess.js";

const editCompanyProfile = async (req,res)=>{

 const userId = req.user.id;

 if(!userId){
  throw new CustomError(400,"User not authenticated");
 }

 const {name,email,phone,companyName,founded,industry,funding,employees,offices,website,companyEmail,recruiterName,recruiterEmail,aboutCompany,companyOverview,linkedin,twitter,facebook,instagram,openjobs,countries,location} = req.body;


 // UPDATE OR CREATE COMPANY PROFILE
 const company = await CompanyProfile.findOneAndUpdate(
  { userId },
  { userId, companyName, founded, industry, funding, employees, offices, website, companyEmail, recruiterName, recruiterEmail, aboutCompany, companyOverview, linkedin, twitter, facebook, instagram,openjobs,countries,location},{ new:true, upsert:true }
 );

 // UPDATE USER BASIC INFO
 await User.findByIdAndUpdate(
  userId,
  { name, email, phone },
  { new: true }
);


 successHandler(res,200,"success","Company profile saved successfully",company);

}

// const getCompanyProfile = async (req,res)=>{

//  const userId = req.user.id;

//  if(!userId){
//   throw new CustomError(400,"User not authenticated");
//  }

//  const company = await CompanyProfile.findOne({ userId }).populate("userId","name email phone profile banner")

//  if(!company){
//   throw new CustomError(404,"Company profile not found");
//  }

//  successHandler(
//   res,
//   200,
//   "success",
//   "Company profile fetched successfully",
//   company
//  );

// }
const getCompanyProfile = async (req, res) => {
  const userId = req.user.id;

  let company = await CompanyProfile.findOne({ userId }).populate(
    "userId",
    "name email phone profile banner"
  );

  if (!company) {
    company = await CompanyProfile.create({
      userId,
      companyName: "My Company",
    });
  }

  successHandler(res, 200, "success", "Company fetched", company);
};

export { editCompanyProfile, getCompanyProfile };