import { AppliedJob } from "../Model/appliedjobs.model.js";
import { JobCreated } from "../Model/job.model.js";
import { CustomError } from "../Utils/ErrorClass.js";
import { successHandler } from "../Utils/sucess.js";

const applyJob = async (req, res) => {
  //  req.user.id - It means logged-in user ID from token
  const userId = req.user.id;
  //  jobid - job ID from URL
  const { jobid } = req.params;

  const job = await JobCreated.findById(jobid);
  // Check Job Exists
  if (!job) {
    throw new CustomError(404, "Job Not Found");
  }

  const alreadyApplied = await AppliedJob.findOne({
    job: jobid,
    applicant: userId,
  });

  if (alreadyApplied) {
    return successHandler(res, 200, "success", "Already Applied");
  }

  const application = await AppliedJob.create({
    job: jobid,
    applicant: userId,
  });

  successHandler(res, 200, "success", "Job applied successfully", application);
};

const getAppliedJobs = async (req, res) => {
  const userId = req.user.id;

  const jobs = await AppliedJob.find({ applicant: userId }).populate("job");

  // Remove Applied  jobs where the job no longer exists
  const validJobs = jobs.filter((item) => item.job !== null);

  successHandler(res, 200, "success", "Applied jobs fetched", validJobs);
};

// getJobs  of particular user

// const getEmployeeData = async (req, res) => {
//   const { userId } = req.params;
//   console.log(userId);
//   if (!userId) {
//     throw new CustomError(400, "User Id Not Found");
//   }

//   const userData = await AppliedJob.findById(userId).populate("applicant");

//   successHandler(res, 201, "success", "Job Fetched Successfully", userData);
// };

// const getEmployeeData = async (req, res) => {
//   const userId = req.user.id; // 🔥 instead of params

// const applications = await AppliedJob.find({
//   applicant: userId
// })
//   .populate("job", "jobTitle companyName")
//   .populate("applicant", "name email");

// // 🔥 REMOVE null jobs
// const validApplications = applications.filter(item => item.job !== null);

// successHandler(res, 200, "success", "User applications fetched", validApplications);
// };

const getApplicantsForEmployer = async (req, res) => {
  const employerId = req.user.id;

  // Step 1: find jobs created by employer
  const jobs = await JobCreated.find({ postedBy: employerId });
// console.log("Applying jobId 👉", jobid);
  const jobIds = jobs.map(job => job._id);

  // Step 2: find applications for those jobs
  const applications = await AppliedJob.find({
    job: { $in: jobIds }
  })
    .populate("job", "jobTitle companyName positions jobType logo")
    .populate("applicant", "name email");

  //   const applications = await AppliedJob.find()
  // .populate("job", "jobTitle companyName")
  // .populate("applicant", "name email");

  successHandler(res, 200, "success", "Applicants fetched", applications);
};

export { applyJob, getAppliedJobs, getApplicantsForEmployer };
