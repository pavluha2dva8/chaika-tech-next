import { MAX_BAlANCE } from '@/utils/default'

export const getStatusColor = (status: string) => {
  if (status === 'Pending') {
    return 'text-warning/80'
  } else if (status === 'Approved') {
    return 'text-info/80'
  } else if (status === 'Declined') {
    return 'text-secondary/80'
  }
  return ''
}

export const getBalance = () => {
  return (Math.random() * MAX_BAlANCE).toFixed(2)
}

export const formatCurrency = (value: number) => {
  return parseFloat(String(value)).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) // Format the balance as currency
}

export const getCurrentMonth = (): string => {
  const currentDate = new Date()
  return currentDate.toLocaleString('en-US', { month: 'long' })
}

export const formatTransactionDate = (dateString: Date): string => {
  const currentDate = new Date()
  const transactionDate = new Date(dateString)

  const timeDifference = currentDate.getTime() - transactionDate.getTime()
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24))

  if (daysDifference <= 7) {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const dayIndex = transactionDate.getDay()
    return dayNames[dayIndex]
  } else {
    return transactionDate.toDateString()
  }
}

export const calculateDailyPoints = () => {
  const currentDate = new Date()
  currentDate.setDate(currentDate.getDate())
  const currentMonth = currentDate.getMonth()

  const seasons = [
    { month: 2, day: 1 },
    { month: 5, day: 1 },
    { month: 8, day: 1 },
    { month: 11, day: 1 },
  ]

  let currentSeasonIndex = 0
  for (let i = 0; i < seasons.length; i++) {
    if (currentMonth >= seasons[i].month) {
      currentSeasonIndex = i
    } else {
      break
    }
  }

  const daysPassedInSeason = getDaysPassedInSeason(currentDate, seasons[currentSeasonIndex])

  const memo: number[] = []

  const calculatePoints = (day: number): number => {
    if (day === 0) {
      return 2
    } else if (day === 1) {
      return 3
    } else {
      if (memo[day] !== undefined) {
        return memo[day]
      }

      const previousDayPoints = calculatePoints(day - 1)
      const dayBeforeYesterdayPoints = calculatePoints(day - 2)
      const points = Math.round(previousDayPoints + 0.6 * dayBeforeYesterdayPoints)

      memo[day] = points
      return points
    }
  }

  const points = calculatePoints(daysPassedInSeason)

  if (points >= 1000) {
    return (points / 1000).toFixed(0) + 'K'
  } else {
    return points.toString()
  }
}

const getDaysPassedInSeason = (
  currentDate: Date,
  seasonStart: { month: number; day: number },
): number => {
  const currentYear = currentDate.getFullYear()

  const seasonStartDate = new Date(currentYear, seasonStart.month, seasonStart.day)
  const timeDifference = currentDate.getTime() - seasonStartDate.getTime()
  return Math.floor(timeDifference / (24 * 60 * 60 * 1000))
}
