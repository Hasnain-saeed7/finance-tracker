// lib/models/Investment.ts
import mongoose, { Schema, models } from 'mongoose'

const InvestmentSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ['stocks', 'crypto', 'real-estate', 'gold', 'mutual-funds', 'savings', 'business', 'other'],
      required: true,
    },
    amountInvested: { type: Number, required: true, min: 0 },
    currentValue: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
)

const Investment = models.Investment || mongoose.model('Investment', InvestmentSchema)
export default Investment