import { Profile } from "../Model/profile.model.js";
import { User } from "../Model/user.model.js";
import { CustomError } from "../Utils/ErrorClass.js";
import { successHandler } from "../Utils/sucess.js";


// Create Profile
// If user does not exist it creates if it exists it edit because here i use findOneAndUpdate

const createProfile = async (req, res) => {

 const userId = req.user.id;

 const {
  name,age,address,country,city,about,education,
  occupation,linkedIn,gitHub,facebook,instagram,
  skills,resume
 } = req.body;

 if (!age || !address || !country || !about || !occupation || !skills) {
   throw new CustomError(400, "Required fields are missing");
 }

 const profile = await Profile.findOneAndUpdate(
  { userId },
  {userId,name,age,address,country,city,about,education,occupation,linkedIn,gitHub,facebook,instagram,skills,resume},
  { new: true, upsert: true }
 );

 successHandler(res, 201, "success", "Profile created successfully", profile);
};



// GET LOGGED-IN USER PROFILE
const getProfile = async (req, res) => {

 const userId = req.user.id;

 const profile = await Profile
  .findOne({ userId })
  .populate("userId","name email phone");

 successHandler(
  res,
  200,
  "success",
  "Profile fetched successfully",
  profile
 );

};


// Edit Profile only for nme ,email and phone
const editProfile = async (req,res)=>{

 const { profileid } = req.params;

 const profile = await Profile.findByIdAndUpdate(
   profileid,
   req.body,
   { new:true }
 );

 await User.findByIdAndUpdate(
   req.user.id,
   {
     name:req.body.name,
     email:req.body.email,
     phone:req.body.phone
   }
 );

 successHandler(res,200,"success","Profile Updated",profile)

}
// GET PROFILE BY ID
const getProfileById = async (req, res) => {

  const { profileid } = req.params;

  const profile = await Profile.findById(profileid);

  if (!profile) {
    throw new CustomError(404, "Profile not found");
  }

  successHandler(res, 200, "success", "Profile fetched successfully", profile);
};


export {createProfile,getProfile,getProfileById,editProfile}