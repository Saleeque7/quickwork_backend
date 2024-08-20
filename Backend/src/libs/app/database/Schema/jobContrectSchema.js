import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dueDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  status:{
    type:String,
    enum: ['pending', 'Completed',],
    default: 'pending',
  }
});

const contractSchema = new mongoose.Schema(
  {
    userSide: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected' ,'submitted','completed'],
        default: 'pending',
      },
    },
    clientSide: {
      clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
      },
      status: {
        type: String,
        enum: ['pending','approved', 'terminated','completed'],
        default: 'pending',
      },
    },
    contractTitle: {
      type: String,
      required: true
    },
    proposalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Proposal',
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobPost',
      required: true,
    },
    budgetType: {
      type: String,
      required: true,
      enum: ['fixed', 'hourly'],
    },
    contractAmount: {
      type: Number,
      required: true,
    },
    projectFile: {
      location: {
        type: String,
      },
      key: {
        type: String,
      },
    },
    paymentOption: {
      type: String,
      required: true,
      enum: ['fullPay', 'milestones'],
    },
    contractDueDate: {
      type: Date,
      required: function () {
        return this.paymentOption === 'fullPay' && this.budgetType === 'fixed';
      },
    },
    milestones: {
      type: [milestoneSchema],
      required: function () {
        return this.paymentOption === 'milestones' && this.budgetType === 'fixed';
      },
    },
    projectStartDate: {
      type: Date,
      required: function () {
        return this.budgetType === 'hourly';
      },
    },
    QwPayment:{
      type:Boolean,
      default:false,
    },
    QwId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'QbWallet',
    },
    workDuration: {
      type: String,
      required: true,
    },
    contractStatus:{
      type: String,
      enum: ['pending', 'completed','dismissed'],
      default: 'pending',
    },
    dismissalReason: {
      type: String,
      required: function () {
        return this.contractStatus === 'dismissed';
      },
    },
  },
  {
    timestamps: true,
  }
);

const Contract = mongoose.model('Contract', contractSchema);

export { Contract };
