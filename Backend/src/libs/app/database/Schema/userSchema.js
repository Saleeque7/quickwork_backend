import mongoose from "mongoose";
import { experienceSchema } from "./experienceSchema.js";

// Transaction Schema
const walletTransactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    source: {
      type: String,
      enum: [
        'Contract Payment',
        'Withdrawal',
      ],
    },
    contractId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contract',
      required: true,
    },
    status: {
      type: String,
      enum: ['credit', 'debit'],
      default: 'credit',
    },
  },
  {
    timestamps: true,
  }
);

const walletSchema = new mongoose.Schema(
  {
    balance: {
      type: Number,
      default: 0,
    },
    Wallettransactions: [walletTransactionSchema],
  },
  {
    _id: false,
    timestamps: true,
  }
);


const notificationSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    proposalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Proposal',
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobPost',
      required: true,
    },
    contractId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contract',
      required: true,
    },
    status: {
      type: String,
      enum: ['read', 'unread'],
      default: 'unread',
    },
    message:{
      type:String,
      required:true
    }
  },
  {
    timestamps: true,
  }
);

// Saved Job Schema
const savedJobSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobPost',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
  { _id: false }
);

// Not Interested Job Schema
const notInterestedJobSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobPost',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
  { _id: false }
);


const applicationSchema = new mongoose.Schema(
  {
    proposalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Proposal',
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobPost',
      required: true,
    }
  },
  {
    _id: false,
  },
  {
    timestamps: true,
  }
 
);


const ratingSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      trim: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobPost', 
      required: true,
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
    contractTitle: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    job_role: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
    isLike: {
      type: Boolean,
      default: false,
    },
    isGoogle: {
      type: Boolean,
      default: false,
    },
    isGithub: {
      type: Boolean,
      default: false,
    },
    profile: {
      location: {
        type: String,
      },
      key: {
        type: String,
      },
    },
    isUserProfile: {
      type: Boolean,
      default: false,
    },
    jobTitle: {
      type: String,
      default: "",
      uppercase: true,
    },
    overview: {
      type: String,
      default: "",
    },
    skills: {
      type: [String],
      default: [],
    },
    hourlyRate: {
      type: Number,
      default: 0,
    },
    totalEarnings: {
      type: Number,
      default: 0
    },
    dateOfBirth: {
      type: Date,
    },
    state: {
      type: String,
    },
    savedJobs: [savedJobSchema],
    notInterestedJobs: [notInterestedJobSchema],
    experiences: [experienceSchema],
    applications: [applicationSchema],
    notifications: [notificationSchema], 
    wallet: walletSchema, 
    ratings: [ratingSchema], 
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 });

const User = mongoose.model("User", userSchema);

export { User };
