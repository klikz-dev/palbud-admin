import moment from 'moment'

export default function getDatesInRange(startDate, endDate) {
  endDate.setDate(endDate.getDate() + 2)
  const date = new Date(startDate.getTime())

  const dates = []

  while (date <= endDate) {
    dates.push(moment(date).format('YYYY-MM-DD'))
    date.setDate(date.getDate() + 1)
  }

  return dates
}
