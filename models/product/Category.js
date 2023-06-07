const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'category name must be provided'],
      maxlength: 200,
      lowercase: true,
      trim: true,
    },
    images: {
      type: [],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

const Category = mongoose.model('Category', categorySchema)

module.exports = { Category }
