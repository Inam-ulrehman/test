//==================filter===============

import moment from 'moment/moment'

// get unique values for filter declare variable
// const categories = getUniqueValues(data,'categories')

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type])
  // if its an array pass error array = [1,2,3]
  if (type === 'array') {
    unique = unique.flat()
  }
  return ['all', ...new Set(unique)]
}

// ======Difference Between 2 Arrays (Note-Don't use _id)========
export function arrayDiffByKey(key, ...arrays) {
  return [].concat(
    ...arrays.map((arr, i) => {
      const others = arrays.slice(0)
      others.splice(i, 1)
      const unique = [...new Set([].concat(...others))]
      return arr.filter((x) => !unique.some((y) => x[key] === y[key]))
    })
  )
}
// Example:

// const a = [{k:1}, {k:2}, {k:3}];
// const b = [{k:1}, {k:4}, {k:5}, {k:6}];
// const c = [{k:3}, {k:5}, {k:7}];
// arrayDiffByKey('k', a, b, c); // (4) [{k:2}, {k:4}, {k:6}, {k:7}]
//=================payments============

// format price for payments like stripe

export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CAD',
  }).format(number / 100)
}

// ==========formate date============
export const formatDate = (date) => {
  return moment(date).format('MMMM Do YYYY,h:mm a')
}
//  for back end data to avoid 425 react error
export const formatDateStatic = (date) => {
  return moment(date).format('MMMM Do YYYY')
}
// ==========bill calculator========

export const totalBill = (cart) => {
  const TotalAmount = cart.reduce((total, cart) => {
    let productQuantity = cart.quantity
    let productAmount = cart.amount * productQuantity
    total += productAmount

    return total
  }, 0)
  return TotalAmount
}
// =============Paragraph limit==========

export const paragraphLimit = (string, length) => {
  var trimmedString = string.substring(0, length) + '...'
  return trimmedString
}
// =============Upper letter ==========

export const titleCase = (string) => {
  return string[0].toUpperCase() + string.slice(1).toLowerCase()
}
// ==========addObjectInState=======
export const addObjectInState = (payload, state) => {
  const objectArray = Object.entries(payload)
  return objectArray.forEach(([key, value]) => {
    state[key] = value
  })
}
// =========is Object Empty==========
export const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0
}

// ============Paginate========

// ====Dynamic way to reduce rerender and javascript

// const CodeSampleModal = dynamic(() => import('../components/CodeSampleModal'), {
//   ssr: false,
// })

// ===========Convert cloudinary image in src========

export const cloudinarySrc = (image) => {
  const first = image.split('/')[7]
  const second = image.split('/')[8].split('.')[0]
  const src = `${first}/${second}`
  return src
}
