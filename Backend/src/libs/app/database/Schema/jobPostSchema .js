import mongoose from "mongoose";


const jobPostSchema = mongoose.Schema(
  {
    projectTerm: {
      type: String,
      required: true,
    },
    jobRole: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    budgetType: {
      type: String,
      required: true,
      enum: ['fixed', 'hourly'],
    },
    budget: {
      type: Number,
      required: function () { return this.budgetType === 'fixed'; },
    },
    wageRangeMin: {
      type: Number,
      required: function () { return this.budgetType === 'hourly'; },
    },
    wageRangeMax: {
      type: Number,
      required: function () { return this.budgetType === 'hourly'; },
    },
    selecthour: {
      type: String,
      required: function () { return this.budgetType === 'hourly'; },
    },
    status: {
      type: String,
      enum: ['pending','Expired','completed'],
      default: 'pending',
    },
    description: {
      type: String,
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
    Expirydate: {
      type: Date,
      required: true
    },
    Place: {
      type: String,
      required: true,
    },
    proposals:[{ type:mongoose.Schema.Types.ObjectId, ref: 'Proposal' }],
  },
  {
    timestamps: true,
  }
);


const JobPost = mongoose.model("JobPost", jobPostSchema);

export { JobPost };
