import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    website: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    logo: {
      type: String, // store image URL or filename
      default: "",
    },
  },
  { timestamps: true }
);

export const Company = mongoose.model("Company", companySchema);