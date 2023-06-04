import { Transaction } from '@/types'
import transactions from '@/utils/transactions.json'

export async function fetchTransactions() {
  return new Promise<Transaction[]>((resolve) => {
    setTimeout(() => {
      const data = JSON.parse(JSON.stringify(transactions))
      resolve(data)
    }, 300)
  })
}

export async function fetchTransactionById(id: string) {
  return new Promise<Transaction | null>((resolve) => {
    setTimeout(() => {
      const data: Transaction[] = JSON.parse(JSON.stringify(transactions))
      const transaction = data.find((t) => t.id === id) || null
      resolve(transaction)
    }, 300)
  })
}
