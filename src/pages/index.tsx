import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TransactionList from '@/components/transactions-list'
import { fetchTransactions } from '@/services/transactions'
import { Transaction } from '@/types'
import { MAX_BAlANCE } from '@/utils/default'
import { calculateDailyPoints, formatCurrency, getBalance, getCurrentMonth } from '@/utils/helpers'

interface TransactionPageProps {
  transactions: Transaction[]
  balance: number
  dailyPoints: string
}

export default function Transactions({ transactions, balance, dailyPoints }: TransactionPageProps) {
  return (
    <>
      <div className="flex mb-4">
        <div className="flex flex-col">
          <div className="bg-primary text-primary-content rounded-lg p-3 shadow-md mb-4">
            <p className="text-xl">Card Balance</p>
            <p className="text-3xl font-bold">{formatCurrency(balance)}</p>
            <p className="text-primary-content/60">
              {formatCurrency(MAX_BAlANCE - balance)} Available
            </p>
          </div>
          <div className="bg-primary text-primary-content rounded-lg p-3 shadow-md">
            <p className="text-xl">Daily Points</p>
            <p className="text-primary-content/60">{dailyPoints}</p>
          </div>
        </div>
        <div className="bg-primary text-primary-content rounded-lg p-3 shadow-md flex-1 ml-4 relative">
          <p className="text-xl">No Payment Due</p>
          <p className="text-primary-content/60">
            You&#39;ve paid your {getCurrentMonth()} balance
          </p>
          <div
            className={
              'w-16 h-16 rounded-full bg-neutral flex items-center justify-center absolute bottom-2 right-2'
            }
          >
            <FontAwesomeIcon icon={faCheck} size="2xl" />
          </div>
        </div>
      </div>
      <TransactionList transactions={transactions} />
    </>
  )
}

export async function getStaticProps() {
  const transactions = await fetchTransactions()
  const balance = getBalance()
  const dailyPoints = calculateDailyPoints()
  return {
    props: {
      transactions,
      balance,
      dailyPoints,
    },
  }
}
