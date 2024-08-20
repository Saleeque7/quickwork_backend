import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    Transaction_id: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    source: {
      type: String,
      enum: [
        'Contract Payment',
        'Refund received',
        'Withdrawal',
      ],
    },
    contractId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contract',
      required: true,
    },
    payment_method: {
      type: String,
      enum: ['RazorPay', 'Stripe'],
    },
  },
  {
    timestamps: true,
  }
);

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
        'Refund received',
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
      ref: 'User',
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

const clientSchema = mongoose.Schema(
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
      type: String,
    },
    isClientProfile: {
      type: Boolean,
      default: false,
    },
    jobPosts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobPost',
    }],
    spentAmount: {
      type: Number,
      default: 0,
    },
    Address: {
      address: {
        type: String,
      },
      state: {
        type: String,
      },
      city: {
        type: String,
      },
      postalCode: {
        type: Number,
      }
    },
    transactionSchema: [transactionSchema],
    wallet: walletSchema, 
    ratings: [ratingSchema],
  },
  {
    timestamps: true,
  }
);

clientSchema.index({ email: 1 });
const Client = mongoose.model("Client", clientSchema);

export { Client };
