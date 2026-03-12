import express from "express";
import { Profile } from "../Model/profile.model.js";
import { CustomError } from "../Utils/ErrorClass.js";
import { successHandler } from "../Utils/sucess.js";

// Create Profile

 const createProfile = async (req, res) => {

  const {name,age,address,country,city,about,education,occupation,linkedIn,gitHub,facebook,instagram,skills,resume
  } = req.body;

  // Validation
  if (!age || !address || !country || !about || !occupation || !skills) {
    throw new CustomError(400, "Required fields are missing");
  }

  const profile = await Profile.findOneAndUpdate(
  {},
  { name,age,address,country,city,about,education,occupation,linkedIn,gitHub,facebook,instagram,skills,resume },
  { new:true, upsert:true }
);

  successHandler(res, 201, "success", "Profile created successfully", profile);
};


// Get Profile
// const getProfile = async (req, res) => {
//   const profile = await Profile.find();
//   successHandler(res, 200, "success", "Profiles fetched successfully", profile);
// };
const getProfile = async (req, res) => {
  const profile = await Profile.findOne();
  successHandler(res, 200, "success", "Profiles fetched successfully", profile);
};

// Edit Profile
const editProfile =async(req,res)=>{
   const { profileid } = req.params; 
   if (!profileid) {
    throw new CustomError(400, "Profile Id is Required");
  }
    const {name,age,address,country,city,about,education,occupation,linkedIn,gitHub,facebook,instagram,skills,resume
  } = req.body;
   const profile=await Profile.findByIdAndUpdate(profileid,{name,age,address,country,city,about,education,occupation,linkedIn,gitHub,facebook,instagram,skills,resume},{ new: true });
  if (!profile) {
    throw new CustomError(404, "Profile Not Found");
  }
 successHandler(res, 200, "success", "Profile Updated  successfully");
}

// Get One profile By ID
const getProfileById = async (req, res) => {
  const { id } = req.params;

  const profile = await Profile.findById(id);

  if (!profile) {
    throw new CustomError(404, "Profile Not Found");
  }

  successHandler(res, 200, "success", "Profile fetched successfully", profile);
};

export {createProfile,getProfile,getProfileById,editProfile}