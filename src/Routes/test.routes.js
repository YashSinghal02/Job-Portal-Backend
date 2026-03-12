import express from "express"
import asyncHandler from "../Middlewares/asyncHandler.js";
import { testcontroller,testcontrollertwo } from "../Controllers/test.controller.js";



const testRoute=express.Router();

testRoute.get("/tester",asyncHandler(testcontroller))
testRoute.get("/tester2",asyncHandler(testcontrollertwo))

export default testRoute