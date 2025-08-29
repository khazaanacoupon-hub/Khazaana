import mongoose from 'mongoose'

const dataSchema = new mongoose.Schema({
  time: {
    type: String,
    required: [true, 'Time is required'],
    trim: true
  },
  number: {
    type: Number,
    required: [true, 'Number is required'],
    validate: {
      validator: function(v) {
        return !isNaN(v) && isFinite(v)
      },
      message: 'Number must be a valid number'
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, {
  timestamps: true
})

// Index for better query performance
dataSchema.index({ createdAt: -1 })
dataSchema.index({ createdBy: 1 })

export const Data = mongoose.model('Data', dataSchema)