import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },

    salary: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    jobType: {
      type: String,
      enum: ["Full Time", "Part Time", "Internship", "Remote"],
      required: true,
    },

    experienceLevel: {
      type: String,
      enum: ["Junior", "Mid Level", "Senior"],
      required: true,
    },

    positions: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    responsibilities: {
      type: [String],
    },

    qualifications: {
      type: [String],
    },

    skills: {
      type: [String],
    },

    logo: {
      type: String,
    },
  },
  { timestamps: true },
);

export const JobCreated = mongoose.model("JobCreated", jobSchema);
