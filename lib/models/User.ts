// lib/models/User.ts
import mongoose, { Schema, models } from 'mongoose'
import { IUser } from '@/types'

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    currency: { type: String, default: 'USD' },
  },
  { timestamps: true }
)

const User = models.User || mongoose.model<IUser>('User', UserSchema)
export default User