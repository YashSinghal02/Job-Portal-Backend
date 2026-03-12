import { JobCreated } from "../Model/job.model.js";
import { User } from "../Model/user.model.js";
import { CustomError } from "../Utils/ErrorClass.js";
import { successHandler } from "../Utils/sucess.js";

// JOb Created
const jobPost = async (req, res) => {
  // Why we required user ID because we know when we post a job we know it always posed by the employer for that we also provide a check protected route in front end
   const { userId } = req.params; 
  const {companyName,jobTitle,salary,location,jobType,experienceLevel,positions,description,responsibilities,qualifications,skills,logo,
  } = req.body;

  if (!companyName || !jobTitle || !salary || !location || !jobType || !experienceLevel || !positions || !description || !responsibilities || !qualifications) {
    throw new CustomError(400, "All Fields Are Required");
  }

  const user=await User.findById(userId);

  if(!user){
     throw new CustomError(400,"User Id Not Valid")
  }

  const job = await JobCreated.create({companyName,jobTitle,salary,location,jobType,experienceLevel,positions,description,responsibilities,qualifications,skills,logo,
  });
// After create(), the variable job contains the full document returned from the database.
  // And only Add job id to user
  user.createdJobs.push(job._id);

  await user.save();


  successHandler(res, 201, "success", "Job created successfully", job);
};

// JOb Card
const jobcardget = async (req, res) => {
  const jobs = await JobCreated.find();
  successHandler(res, 200, "success", "Jobs fetched successfully", jobs);
};

// Job Delete
const deleteJob = async (req, res) => {
  const { jobid } = req.params;

  if (!jobid) {
    throw new CustomError(400, "Job Id is Required");
  }

  const job = await JobCreated.findByIdAndDelete(jobid);

  if (!job) {
    throw new CustomError(404, "Job Not Found");
  }

  successHandler(res, 200, "success", "Job Deleted Successfully");
};

// Job Edit
const editJob =async(req,res)=>{
   const { jobid } = req.params; 
   if (!jobid) {
    throw new CustomError(400, "Job Id is Required");
  }
   const {companyName,jobTitle,salary,location,jobType,experienceLevel,positions,description,responsibilities,qualifications,skills,logo,
  } = req.body;
   const job=await JobCreated.findByIdAndUpdate(jobid,{companyName,jobTitle,salary,location,jobType,experienceLevel,positions,description,responsibilities,qualifications,skills,logo,
  },{ new: true });
  if (!job) {
    throw new CustomError(404, "Job Not Found");
  }
 successHandler(res, 200, "success", "Jobs Updated  successfully");
}

// Get One Job By ID
const getJobById = async (req, res) => {
  const { id } = req.params;

  const job = await JobCreated.findById(id);

  if (!job) {
    throw new CustomError(404, "Job Not Found");
  }

  successHandler(res, 200, "success", "Job fetched successfully", job);
};

export { jobPost, jobcardget, deleteJob,editJob ,getJobById };
