// lib/models/User.ts
import mongoose, { Schema, models } from 'mongoose'
import { IUser } from '@/types'

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String,  select: false },
    currency: { type: String, default: 'PKR' },
  }, 
  { timestamps: true }
)

const User = models.User || mongoose.model<IUser>('User', UserSchema)
export default User