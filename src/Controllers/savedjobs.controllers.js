import { SavedJob } from "../Model/savejobs.model.js";
import { CustomError } from "../Utils/ErrorClass.js";
import { successHandler } from "../Utils/sucess.js";

// Save a job
const saveJob = async (req, res) => {
  const userId = req.user.id;
  const { jobid } = req.params;

  const alreadySaved = await SavedJob.findOne({ job: jobid, user: userId });
  // if (alreadySaved) {
  //   throw new CustomError(400, "Job already saved");
  // }

  if (alreadySaved) {
  return successHandler(
    res,
    400,
    "fail",
    "Already Saved"
  );
}

  const saved = await SavedJob.create({ job: jobid, user: userId });

  successHandler(res, 200, "success", "Job saved successfully", saved);
};

// Get saved jobs
const getSavedJobs = async (req, res) => {
  const userId = req.user.id;

  const jobs = await SavedJob.find({ user: userId }).populate("job");

  // Remove saved jobs where the job no longer exists
  const validJobs = jobs.filter(item => item.job !== null);

  successHandler(res, 200, "success", "Saved jobs fetched", validJobs);
};
export { saveJob, getSavedJobs };