// lib/models/Transaction.ts
import mongoose, { Schema, models } from 'mongoose'
import { ITransaction } from '@/types'

const TransactionSchema = new Schema<ITransaction>(
  {
    userId: { type: String, required: true, index: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    amount: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      enum: ['food','transport','shopping','bills','health','entertainment','salary','freelance','investment','other'],
      required: true,
    },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    tags: [{ type: String }],
  },
  { timestamps: true }
)

const Transaction = models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema)
export default Transaction