import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// ✅ File Filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
    "application/pdf",
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only images and PDF allowed"));
  }

  cb(null, true);
};

// ✅ Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "others"; // default folder

    switch (file.fieldname) {
      case "resume":
        folder = "resume";
        break;
      case "banner":
        folder = "banner";
        break;
      case "profile":
        folder = "profile";
        break;
      case "companylogo":
        folder = "companylogo";
        break;
      case "logo": // ✅ Job logo field
        folder = "companylogo";
        break;
      case "file":
        folder = "companylogo"; // fallback
        break;
      default:
        folder = "others";
    }

    return {
      folder,
      allowed_formats: ["jpg", "jpeg", "png", "webp", "pdf"],
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});