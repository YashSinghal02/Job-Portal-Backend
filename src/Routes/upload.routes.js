import express from "express";
import asyncHandler from "../Middlewares/asyncHandler.js";
import { fileUpload } from "../Controllers/upload.controllers.js";
import { uploadSingle } from "../Controllers/uploadSingle.controller.js";
import { upload } from "../Service/storage.js";
import { authCheck } from "../Middlewares/authCheck.js";
import { roleCheck } from "../Middlewares/roleCheck.js";

const UploadRoute = express.Router();

// ✅ USER FILES (profile/banner/resume)
UploadRoute.post(
  "/user/:userId",
  authCheck,
  roleCheck("employee", "employer"),
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "banner", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  asyncHandler(fileUpload)
);

// ✅ SINGLE FILE (LOGO)
UploadRoute.post(
  "/single",
  authCheck,
  upload.single("file"), // 👈 IMPORTANT
  asyncHandler(uploadSingle) // 👈 FIXED
);

export default UploadRoute;