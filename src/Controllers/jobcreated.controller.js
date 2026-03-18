import { JobCreated } from "../Model/job.model.js";
import { User } from "../Model/user.model.js";
import { CustomError } from "../Utils/ErrorClass.js";
import { successHandler } from "../Utils/sucess.js";

// JOb Created
const jobPost = async (req, res) => {
  const { userId } = req.params;

  const {
    companyName,
    jobTitle,
    salary,
    location,
    jobType,
    experienceLevel,
    positions,
    description,
    responsibilities,
    qualifications,
    skills,
    logo,
  } = req.body;

  if (
    !companyName ||
    !jobTitle ||
    !salary ||
    !location ||
    !jobType ||
    !experienceLevel ||
    !positions ||
    !description ||
    !responsibilities ||
    !qualifications
  ) {
    throw new CustomError(400, "All Fields Are Required");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new CustomError(400, "User Id Not Valid");
  }

  // ✅ CLEAN CREATE
  const job = await JobCreated.create({
    companyName,
    jobTitle,
    salary,
    location,
    jobType,
    experienceLevel,
    positions,
    description,
    responsibilities,
    qualifications,
    skills,
    logo, // ✅ per job logo
    postedBy: userId, // ✅ direct
  });

  user.createdJobs.push(job._id);
  await user.save();

  successHandler(res, 201, "success", "Job created successfully", job);
};

const getAllJobs = async (req, res) => {
  const jobs = await JobCreated.find().populate("postedBy", "name email");

  successHandler(res, 200, "success", "All jobs fetched", jobs);
};

// JOb Card
const jobcardget = async (req, res) => {
  const jobs = await JobCreated.find();
  successHandler(res, 200, "success", "Jobs fetched successfully", jobs);
};

// Job Delete
const deleteJob = async (req, res) => {

  const { jobid } = req.params;
  const userId = req.user.id;

  if (!jobid) {
    throw new CustomError(400, "Job Id is Required");
  }

  const job = await JobCreated.findById(jobid);

  if (!job) {
    throw new CustomError(404, "Job Not Found");
  }

  // authorization check
  if (!job.postedBy.equals(userId)) {
    throw new CustomError(403, "You cannot delete this job");
  }

  await JobCreated.findByIdAndDelete(jobid);

  successHandler(res, 200, "success", "Job Deleted Successfully");

};

// Job Edit
// const editJob = async (req, res) => {
//   const { id } = req.user;
//   console.log("Logged in user:", req.user);
//   const { jobid } = req.params;
//   if (!jobid) {
//     throw new CustomError(400, "Job Id is Required");
//   }
//   const job = await JobCreated.findById(jobid);

//   if (!job) {
//     throw new CustomError(404, "Job Not Found");
//   }
//   console.log("Job owner:", job.postedBy.toString());
//   //  authorization check (so no anyone could edit)
//   if (job.postedBy.toString() !== id) {
//     throw new CustomError(403, "You cannot edit this job");
//   }
//   const {companyName,jobTitle,salary,location,jobType,experienceLevel,positions,description,responsibilities,qualifications,skills,logo,
//   } = req.body;
//   const updatedJob = await JobCreated.findByIdAndUpdate(
//     jobid,
//     {companyName,jobTitle,salary,location,jobType,experienceLevel,positions,description,responsibilities,qualifications,skills,logo,
//     },
//     { new: true },
//   );
//   if (!updatedJob) {
//     throw new CustomError(404, "Job Not Found");
//   }
//   successHandler(res, 200, "success", "Jobs Updated  successfully", updatedJob);
// };

const editJob = async (req, res) => {
  const userId = req.user.id;
  const { jobid } = req.params;

  if (!jobid) throw new CustomError(400, "Job Id is Required");

  const job = await JobCreated.findById(jobid);
  if (!job) throw new CustomError(404, "Job Not Found");

  if (job.postedBy.toString() !== userId)
    throw new CustomError(403, "You cannot edit this job");

  // ✅ Parse fields from req.body
  const {
    companyName,
    jobTitle,
    salary,
    location,
    jobType,
    experienceLevel,
    positions,
    description,
  } = req.body;

  // ✅ Arrays: split if sent as strings (FormData sends multiple same-name fields as array)
  const responsibilities = Array.isArray(req.body.responsibilities)
    ? req.body.responsibilities
    : [req.body.responsibilities].filter(Boolean);

  const qualifications = Array.isArray(req.body.qualifications)
    ? req.body.qualifications
    : [req.body.qualifications].filter(Boolean);

  const skills = Array.isArray(req.body.skills)
    ? req.body.skills
    : [req.body.skills].filter(Boolean);

  // ✅ Logo from multer
  let logo = job.logo; // keep old logo if not uploaded
  if (req.file) logo = req.file.path;

  // Update
  const updatedJob = await JobCreated.findByIdAndUpdate(
    jobid,
    {
      companyName,
      jobTitle,
      salary,
      location,
      jobType,
      experienceLevel,
      positions,
      description,
      responsibilities,
      qualifications,
      skills,
      logo,
    },
    { new: true }
  );

  successHandler(res, 200, "success", "Job Updated successfully", updatedJob);
};

// Get One Job By ID
const getJobById = async (req, res) => {
  const { id } = req.params;

  const job = await JobCreated.findById(id);

  if (!job) {
    throw new CustomError(404, "Job Not Found");
  }

  successHandler(res, 200, "success", "Job fetched successfully", job);
};

export { jobPost, getAllJobs, jobcardget, deleteJob, editJob, getJobById };
