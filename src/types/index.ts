export type TransactionType = 'Payment' | 'Credit'

export type TransactionStatus = 'Approved' | 'Pending' | 'Declined'

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  name: string
  description: string
  date: Date
  status: TransactionStatus
  authorizedUser?: string
}
