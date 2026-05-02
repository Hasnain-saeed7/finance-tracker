// lib/models/Budget.ts
import mongoose, { Schema, models } from 'mongoose'
import { IBudget } from '@/types'

const BudgetSchema = new Schema<IBudget>({
  userId: { type: String, required: true, index: true },
  category: { type: String, required: true },
  limit: { type: Number, required: true, min: 0 },
  month: { type: String, required: true }, // "2026-05"
})

// One budget per category per user per month
BudgetSchema.index({ userId: 1, category: 1, month: 1 }, { unique: true })

const Budget = models.Budget || mongoose.model<IBudget>('Budget', BudgetSchema)
export default Budget 
