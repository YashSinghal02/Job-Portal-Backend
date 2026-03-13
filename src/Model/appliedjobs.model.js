import mongoose from "mongoose";

const appliedJobSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobCreated",
    required: true
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

export const AppliedJob= mongoose.model("AppliedJob", appliedJobSchema);
