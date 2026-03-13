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
    applicant: userId
  });

  if (alreadyApplied) {
    throw new CustomError(400, "Already applied for this job");
  }

  const application = await AppliedJob.create({
    job: jobid,
    applicant: userId
  });

  successHandler(res, 200, "success", "Job applied successfully", application);
};

const getAppliedJobs = async (req, res) => {

  const userId = req.user.id;

  const jobs = await AppliedJob.find({ applicant: userId }).populate("job");

  // Remove Applied  jobs where the job no longer exists
  const validJobs = jobs.filter(item => item.job !== null);

  successHandler(res, 200, "success", "Applied jobs fetched", validJobs);
};

export{applyJob,getAppliedJobs}