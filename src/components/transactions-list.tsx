import TransactionItem from '@/components/transaction-item'
import { Transaction } from '@/types'

export default function TransactionList({ transactions }: { transactions: Transaction[] }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Latest Transactions</h2>
      <ul>
        {transactions &&
          transactions.map((transaction, i) => (
            <TransactionItem
              key={transaction.id}
              {...transaction}
              first={!i}
              last={i === transactions.length - 1}
            />
          ))}
      </ul>
    </div>
  )
}
