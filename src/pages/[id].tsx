import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { fetchTransactionById, fetchTransactions } from '@/services/transactions'
import { Transaction } from '@/types'
import { getStatusColor } from '@/utils/helpers'

export default function TransactionDetail({ transaction }: { transaction: Transaction }) {
  const router = useRouter()
  const statusColor = getStatusColor(transaction.status)

  const handleGoBack = () => {
    router.push('/')
  }

  return (
    <>
      <button className="mb-12" onClick={handleGoBack}>
        <FontAwesomeIcon icon={faArrowLeft} /> Go Back
      </button>
      <p className="mb-4 text-center text-6xl font-bold">${transaction.amount}</p>
      <p className="mb-8 text-center text-xl">{new Date(transaction.date).toDateString()}</p>
      <div className="p-2 bg-neutral border border-primary rounded-xl">
        <p>
          Status: <span className={`font-bold ${statusColor}`}>{transaction.status}</span>
        </p>
        <p>{transaction.description}</p>
      </div>
    </>
  )
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { id } = context.params || {}
  const transaction = await fetchTransactionById(id as string)
  return {
    props: {
      transaction,
    },
  }
}

export async function getStaticPaths() {
  const transactions = await fetchTransactions()

  const paths = transactions.map((transaction) => ({
    params: { id: transaction.id.toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}
