import moment from 'moment'

export function removeUndefinedValues(obj) {
  // Convert object to an array of key-value pairs
  const entries = Object.entries(obj)

  // Filter out entries where the value is undefined
  const filteredEntries = entries.filter(([key, value]) => value !== undefined)
  if (filteredEntries.dob) {
  }
  // Convert the filtered entries back to an object
  let filteredObj = Object.fromEntries(filteredEntries)

  // store date of birth in MongoDB formate
  if (filteredObj.dob) {
    const formattedDate = moment(filteredObj.dob).toISOString()
    filteredObj.dob = formattedDate
  }

  return filteredObj
}
