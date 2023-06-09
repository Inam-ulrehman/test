const mongoose = require('mongoose')

const SubCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'SubCategory name must be provided'],
      maxlength: 200,
      lowercase: true,
      trim: true,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Please provide at least one category'],
      },
    ],
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

export default mongoose.models.SubCategory ||
  mongoose.model('SubCategory', SubCategorySchema)
