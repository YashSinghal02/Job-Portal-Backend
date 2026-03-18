import { CustomError } from "../Utils/ErrorClass.js";

const uploadSingle = async (req, res) => {
  if (!req.file) {
    throw new CustomError(400, "No file uploaded");
  }

  res.status(200).json({
    message: "File uploaded successfully",
    url: req.file.path, // ✅ Cloudinary URL
  });
};

export { uploadSingle };