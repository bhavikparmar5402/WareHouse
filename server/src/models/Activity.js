import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema(
  {
    timestamp: {
      type: Date,
      default: Date.now,
    },
    activity: {
      type: String,
      required: true,
    },
    item: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Received', 'Shipped', 'Alert', 'Processing', 'Pending'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Activity', ActivitySchema);
