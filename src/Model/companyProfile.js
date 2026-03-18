import mongoose from "mongoose";

const companyProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    companyName: {
      type: String,
      required: true
    },

    founded: {
      type: String
    },

    industry: {
      type: String
    },

    funding: {
      type: String
    },

    employees: {
      type: String
    },

    offices: {
      type: String
    },

    openjobs: {
      type: String
    },

    countries: {
      type: String
    },

    location: {
      type: String
    },

    website: {
      type: String
    },

    companyEmail: {
      type: String
    },

    recruiterName: {
      type: String
    },

    recruiterEmail: {
      type: String
    },

    aboutCompany: {
      type: String
    },

    companyOverview: {
      type: String
    },

    linkedin: {
      type: String
    },

    twitter: {
      type: String
    },

    facebook: {
      type: String
    },

    instagram: {
      type: String
    },
    // ✅ LOGO
    companylogo: {
      type: String, // URL
    },
    companylogoId: {
      type: String, // Cloudinary public_id
    },

  },
  { timestamps: true }
);

export const CompanyProfile = mongoose.model("CompanyProfile", companyProfileSchema);
