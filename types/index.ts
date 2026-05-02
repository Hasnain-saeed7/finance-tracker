// types/index.ts
export type TransactionType = 'income' | 'expense'

export type Category =
  | 'food'
  | 'transport'
  | 'shopping'
  | 'bills'
  | 'health'
  | 'entertainment'
  | 'salary'
  | 'freelance'
  | 'investment'
  | 'other'

export interface IUser {
  _id: string
  name: string
  email: string
  currency: string
  createdAt: Date 
  passwordHash?: string

}

export interface ITransaction {
  _id: string
  userId: string
  type: TransactionType
  amount: number
  category: Category
  description: string
  date: Date
  tags: string[]
  createdAt: Date
}

export interface IBudget {
  _id: string
  userId: string
  category: Category
  limit: number
  month: string // format: "2026-05"
}

export interface CategoryTotal {
  category: Category
  total: number
}

export interface MonthlyTotal {
  month: string
  income: number
  expenses: number
}