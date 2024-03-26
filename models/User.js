import { Schema, model } from 'mongoose';
import { emailRegExp } from '../constants/user-constants.js';
import { handleSaveError, handleUpdateSettings } from './hooks.js';

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      match: emailRegExp,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSaveError);

userSchema.pre('findOneAndUpdate', handleUpdateSettings);

userSchema.post('findOneAndUpdate', handleSaveError);

const User = model('auth', userSchema);

export default User;
