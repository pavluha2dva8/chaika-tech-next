import { faCrow } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import { Transaction } from '@/types'
import { formatCurrency, formatTransactionDate, getStatusColor } from '@/utils/helpers'

type TransactionItemProps = Transaction & {
  first: boolean
  last: boolean
}

export default function TransactionItem({
  id,
  type,
  name,
  description,
  status,
  amount,
  date,
  authorizedUser,
  first,
  last,
}: TransactionItemProps) {
  const router = useRouter()
  const isPayment = type === 'Payment' ? '+' : ''
  const showStatus = status !== 'Approved'
  const statusColor = getStatusColor(status)

  const handleOpenDetails = () => {
    router.push(`/${id}`)
  }

  return (
    <li
      onClick={handleOpenDetails}
      className={`flex items-center justify-between p-2 bg-neutral hover:bg-neutral/80 border-b border-primary cursor-pointer ${
        first ? 'rounded-t-xl' : ''
      }
    ${last ? 'rounded-b-xl' : ''}`}
    >
      <div className="flex items-center">
        <div className={'w-10 h-10 rounded-box bg-primary flex items-center justify-center'}>
          <FontAwesomeIcon icon={faCrow} />
        </div>
        <div className="flex-col ml-2">
          <p className="text-xl font-bold">{type === 'Payment' ? type : name}</p>
          <p className="text-neutral-content/60 whitespace-nowrap overflow-hidden overflow-ellipsis w-56">
            {showStatus && (
              <>
                <span className={`font-bold ${statusColor}`}>{status}</span> -{' '}
              </>
            )}
            {description}
          </p>
          <p className="text-sm text-neutral-content/60">
            {authorizedUser && (
              <>
                <span>{authorizedUser}</span> -{' '}
              </>
            )}
            {formatTransactionDate(date)}
          </p>
        </div>
      </div>
      <p className="text-right font-bold">
        {isPayment}
        {formatCurrency(amount)}
      </p>
    </li>
  )
}
