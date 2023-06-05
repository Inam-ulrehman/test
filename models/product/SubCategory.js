const mongoose = require('mongoose')

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'subCategory name must be provided'],
      maxlength: 200,
      lowercase: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },

    image: {
      type: [],
      required: [true, 'subCategory image must be provided'],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

const SubCategory = mongoose.model('SubCategory', subCategorySchema)

module.exports = { SubCategory }
