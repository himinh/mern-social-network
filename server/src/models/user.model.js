import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { roles } from '../config'
import { transValidations } from '../_lang/en'
import { toJSON, paginate } from './plugins'

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      index: true,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [emailRegex, transValidations.email_incorrect],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      match: [passwordRegex, transValidations.password_incorrect],
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    coverPhoto: String,
    profilePic: String,
    authKey: String,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.password
        return ret
      },
    },
  }
)

userSchema.pre('save', async function (next) {
  // only hash the password if it has been modified (or is new)
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})

userSchema.methods = {
  /**
   * Check if password matches the user's password
   * @param {string} password
   * @returns {Promise<boolean>}
   */
  async isPasswordMatch(password) {
    return bcrypt.compare(password, this.password)
  },
}

// add plugin that converts mongoose to json
userSchema.plugin(toJSON)
userSchema.plugin(paginate)

/**
 * @typedef User
 */
export const User = mongoose.model('User', userSchema)
