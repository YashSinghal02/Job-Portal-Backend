import express from "express"
import asyncHandler from "../Middlewares/asyncHandler.js";
import { fileUpload } from "../Controllers/upload.controllers.js";
import { upload } from "../Service/storage.js";



const UploadRoute = express.Router();
// fileUpload
UploadRoute.post("/", upload.single("file"), asyncHandler(fileUpload));
export default UploadRoute;
