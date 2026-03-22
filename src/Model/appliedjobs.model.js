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

// ✅ ADD THIS HERE
appliedJobSchema.index({ job: 1, applicant: 1 }, { unique: true });

export const AppliedJob= mongoose.model("AppliedJob", appliedJobSchema);
