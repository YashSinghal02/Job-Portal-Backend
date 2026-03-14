import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
    },

    age: {
      type: Number,
    },

    address: {
      type: String,
    },

    country: {
      type: String,
    },

    city: {
      type: String,
    },

    about: {
      type: String,
    },

    education: {
      type: [String],
    },

    occupation: {
      type: String,
    },

    linkedIn: {
      type: String,
    },

    gitHub: {
      type: String,
    },

    facebook: {
      type: String,
    },

    instagram: {
      type: String,
    },

    skills: {
      type: [String],
    },

    profilePicture: {
      type: String,
    },

    resume: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Profile = mongoose.model("Profile", profileSchema);
