import  mongoose from 'mongoose'

const jobSubmissionSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPost',
    required: true
  },
  contractId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contract',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client', 
    required: true
  },
  completionDate: {
    type: Date,
    required: true
  },
  overview: {
    type: String,
    required: true
  },
  status:{
    type: String,
    enum: ['pending', 'accept','reject'],
    default: 'pending',
  },
  projectFile: {
    location: {
        type: String,
      },
      key: {
        type: String,
      },
  }
}, {
  timestamps: true 
});

const JobSubmission = mongoose.model('JobSubmission', jobSubmissionSchema);
export {JobSubmission}
