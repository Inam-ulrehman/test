const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title must be provided'],
      maxlength: 60,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'product description must be provided'],
      maxlength: 160,
      trim: true,
    },
    image: {
      type: [],
    },
    tags: {
      type: [],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory',
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    feature: {
      type: Boolean,
      default: false,
    },
    totalStock: {
      type: Number,
      default: 10,
    },
    amount: {
      type: Number,
      required: [true, 'product amount must be provided'],
    },
    details: {
      type: String,
      maxlength: 4000,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

export default mongoose.models.CProduct ||
  mongoose.model('CProduct', CProductSchema)
