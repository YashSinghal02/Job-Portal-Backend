import { User } from "../Model/user.model.js";
import { CustomError } from "../Utils/ErrorClass.js";
import { successHandler } from "../Utils/sucess.js";

// File Upload
// const fileUpload = async (req, res) => {
//   console.log("🚀 Upload controller triggered");
//   console.log("File Object:", req.file);

//   if (!req.file) {
//     throw new Error("File not uploaded");
//   }

//   res.status(200).json({
//     message: "File uploaded successfully",
//     url: req.file.path,
//     public_id: req.file.filename,
//   });
// };

const fileUpload = async (req, res) => {
  console.log("🚀 Upload controller triggered");
  console.log("Files:", req.files);

  const { userId } = req.params;

  if (!userId) {
    throw new CustomError(400, "User Id Not Found");
  }

  if (userId !== req.user.id) {
    throw new CustomError(403, "Unauthorized");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new CustomError(404, "User Not Found");
  }

  // ✅ Profile
  if (req.files?.profile) {
    user.profile = req.files.profile[0].path;
  }

  // ✅ Banner
  if (req.files?.banner) {
    user.banner = req.files.banner[0].path;
  }

  // ✅ Resume
  if (req.files?.resume) {
    user.resume = req.files.resume[0].path;
  }

  await user.save();

  const response = {
    profile: user.profile,
    banner: user.banner,
    resume: user.resume,
  };

  successHandler(res, 200, "success", "Uploaded", response);
};
export { fileUpload };