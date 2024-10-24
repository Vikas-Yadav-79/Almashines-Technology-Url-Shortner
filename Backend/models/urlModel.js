import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    unique: true, 
  },
  qrCode: {
    type: String, 
  },
  clickStats: {
    totalClicks: {
      type: Number,
      default: 0,
    },
    uniqueClicks: {
      type: Number,
      default: 0,
    },
    clickDetails: [
      {
        ip: String,
        location: String, 
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  expirationDate: {
    type: Date, 
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Optional, only needed for logged-in users
  },
  isExpired: {
    type: Boolean,
    default: false, 
  },
  password: {
    type: String, // Optional field for password protection
  },
}, { timestamps: true }); 

urlSchema.methods.isUrlExpired = function() {
  return this.expirationDate && new Date() > this.expirationDate;
};

// Index the expirationDate to automatically delete expired URLs (optional)
urlSchema.index({ expirationDate: 1 }, { expireAfterSeconds: 0 });

const URL = mongoose.model('URL', urlSchema);

export default URL;
