import mongoose from 'mongoose'

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      maxlength: 200,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      maxlength: 100,
    },
    mobile: {
      type: String,
      required: [true, 'Please provide mobile'],
      maxlength: 100,
    },
    subject: {
      type: String,
      required: [true, 'Please provide subject'],
      maxlength: 100,
    },
    message: {
      type: String,
      required: [true, 'Please provide message'],
      minLength: 3,
      maxLength: 4000,
    },
  },

  { timestamps: true, runValidators: true }
)

export default mongoose.models.Contact ||
  mongoose.model('Contact', ContactSchema)
