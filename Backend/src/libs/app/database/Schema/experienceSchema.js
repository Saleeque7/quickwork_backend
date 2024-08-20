
import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: false
  },
  company: {
    type: String,
    required: false
  },
  duration: {
    type: String
  },
  overview: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export { experienceSchema };
