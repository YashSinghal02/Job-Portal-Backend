import { AppliedJob } from "../Model/appliedjobs.model.js";
import { JobCreated } from "../Model/job.model.js";
import { CustomError } from "../Utils/ErrorClass.js";
import { successHandler } from "../Utils/sucess.js";

// Post Job where all job fetched
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
    return successHandler(res, 400, "fail", "Already Applied");
  }

  const application = await AppliedJob.create({
    job: jobid,
    applicant: userId,
  });

  successHandler(res, 200, "success", "Job applied successfully", application);
};

// Get Jobs in Applied tab
const getAppliedJobs = async (req, res) => {
  const userId = req.user.id;

  const jobs = await AppliedJob.find({ applicant: userId }).populate("job");

  // Remove Applied  jobs where the job no longer exists
  const validJobs = jobs.filter((item) => item.job !== null);

  successHandler(res, 200, "success", "Applied jobs fetched", validJobs);
};


// Employer can see who applicant applied for his job only

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
