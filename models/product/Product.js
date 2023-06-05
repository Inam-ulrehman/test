const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
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
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

module.exports = { Product }
