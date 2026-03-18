import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
      type: String,
      enum: ["employee", "employer"],
      default: "employee",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: String,
    },
    appliedJobs:[{type:mongoose.Schema.Types.ObjectId,ref:"JobCreated"}],
    createdJobs:[{type:mongoose.Schema.Types.ObjectId,ref:"JobCreated"}],
    savedJobs:[{type:mongoose.Schema.Types.ObjectId,ref:"JobCreated"}],
    profile: {type: String,},
    resume: {type: String,},
    banner: {type: String,},

  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);

 
