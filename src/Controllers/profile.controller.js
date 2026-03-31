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


const getProfile = async (req, res) => {
  let profile = await Profile.findOne({ userId: req.user.id }).populate("userId");

  // AUTO CREATE IF NOT EXISTS
  if (!profile) {
    profile = await Profile.create({
      userId: req.user.id,
    });

    profile = await Profile.findById(profile._id).populate("userId");
  }

  successHandler(
    res,
    200,
    "success",
    "Profile fetched successfully",
    profile
  );
};

// Edit Profile only for nme ,email and phone
// const editProfile = async (req,res)=>{

//  const { profileid } = req.params;

//  const profile = await Profile.findByIdAndUpdate(
//    profileid,
//    req.body,
//    { new:true }
//  );

//  await User.findByIdAndUpdate(
//    req.user.id,
//    {
//      name:req.body.name,
//      email:req.body.email,
//      phone:req.body.phone
//    }
//  );

//  successHandler(res,200,"success","Profile Updated",profile)

// }

// This pattern is called Upsert Profile Pattern.

// Benefits:

// ✔ First time → creates profile
// ✔ Next time → updates profile
// ✔ No need to track profileId
// ✔ Cleaner frontend

const editProfile = async (req,res)=>{

 const userId = req.user.id;

 const profile = await Profile.findOneAndUpdate(
   { userId },
   req.body,
   { new:true, upsert:true } // THIS AUTO CREATES PROFILE
 );

 await User.findByIdAndUpdate(
   userId,
   {
     name:req.body.name,
     email:req.body.email,
     phone:req.body.phone
   }
 );

 successHandler(res,200,"success","Profile Updated",profile)

}


// GET PROFILE BY ID
//  Employer can see who applicant applied for his job only and view his profile only 
const getProfileById = async (req, res) => {
  const { profileid } = req.params;

  let profile = await Profile.findOne({ userId: profileid })
    .populate("userId", "name email profile banner phone resume gitHub linkedIn instagram");

  // ✅ If profile doesn't exist → create empty one
  if (!profile) {
    profile = await Profile.create({ userId: profileid });

    profile = await Profile.findOne({ userId: profileid })
      .populate("userId", "name email profile banner phone resume gitHub linkedIn instagram");
  }

  successHandler(res, 200, "success", "Profile fetched successfully", profile);
};


export {createProfile,getProfile,getProfileById,editProfile}