import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema(
  {
    barcode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    weight: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
      enum: ['MTR', 'Parasuit', 'Dabour'],
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    expiry: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Item', ItemSchema);
