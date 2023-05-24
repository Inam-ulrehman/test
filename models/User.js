import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import * as jose from 'jose'
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      maxlength: 50,
      minlength: 3,
      lowercase: true,
      trim: true,
    },
    lastName: {
      type: String,
      maxlength: 50,
      lowercase: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      default: 'male',
      lowercase: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      trim: true,
    },
    apartment: {
      type: String,
      maxlength: 50,
      lowercase: true,
      trim: true,
    },
    house: {
      type: String,
      maxlength: 50,
      lowercase: true,
      trim: true,
    },
    street: {
      type: String,
      maxlength: 100,
      lowercase: true,
      trim: true,
    },
    city: {
      type: String,
      maxlength: 100,
      lowercase: true,
      trim: true,
    },
    province: {
      type: String,
      maxlength: 50,
      lowercase: true,
      trim: true,
    },
    country: {
      type: String,
      maxlength: 50,
      lowercase: true,
      trim: true,
    },
    postalCode: {
      type: String,
      maxlength: 50,
      lowercase: true,
      trim: true,
    },
    mobile: {
      type: Number,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 50,
      minlength: 8,
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 6,
    },
    role: {
      type: String,
      default: 'user',
    },

    recoveryToken: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    notes: [
      {
        type: new mongoose.Schema(
          {
            note: {
              type: String,
            },
          },
          { timestamps: true }
        ),
      },
    ],
  },
  { timestamps: true }
)
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = async function () {
  const alg = 'HS256'

  return await new jose.SignJWT({ userId: this._id, name: this.name })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer(this.role)
    .setAudience(`urn:example:audience`)
    .setExpirationTime(process.env.JWT_LIFETIME)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET))
}
// password recovery token
UserSchema.methods.recoverJWT = async function () {
  const alg = 'HS256'

  return await new jose.SignJWT({ userId: this._id, name: this.name })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer(this.role)
    .setAudience(`urn:example:audience`)
    .setExpirationTime('1h')
    .sign(new TextEncoder().encode(process.env.JWT_SECRET))
}

UserSchema.methods.comparePassword = async function (candiDatePassword) {
  const isMatch = await bcrypt.compare(candiDatePassword, this.password)
  return isMatch
}
export default mongoose.models.User || mongoose.model('User', UserSchema)
