import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const proposalSchema = new Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPost',
    required: true,
  },
  freelancerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  coverLetter: {
    type: String,
    required: true,
  },
  bidAmount: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'archived','shortList', 'rejected'],
    default: 'pending',
  },  
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

proposalSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Proposal = mongoose.model('Proposal', proposalSchema);
export { Proposal };
