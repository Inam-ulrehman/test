import dbConnect from '@/lib/dbConnect'
import mongooseErrorHandler from '@/lib/errors/mongoose-error-handler'
import Sample from '@/public/models/Sample'

import { StatusCodes } from 'http-status-codes'

export async function GET(request, res) {
  const searchParams = request.nextUrl.searchParams

  await dbConnect()
  // name has multiple options to add
  const name = searchParams.get('name')?.split(',')
  const lastName = searchParams.get('lastName')?.split(',')
  const city = searchParams.get('city')?.split(',')
  // const priceLow = searchParams.get('priceLow')
  // const priceHigh = searchParams.get('priceHigh')
  let sortField = searchParams.get('sortField')

  let query = []

  if (name) {
    query = [...query, { name: name }]
  }
  // after we add multiple options for query only then we declare search
  let search = {
    $or: query,
  }

  if (!name) {
    search = {}
  }

  if (lastName) {
    search = { ...search, lastName: lastName }
  }
  if (city) {
    search = { ...search, city: city }
  }

  // if (priceLow) {
  //   search = { ...search, price: { ...price, $gte: priceLow } }
  // }
  // if (priceHigh) {
  //   search = { ...search, price: { ...price, $lte: priceHigh } }
  // }
  // if (priceLow && priceHigh) {
  //   search = { ...search, price: { $gte: priceLow, $lte: priceHigh } }
  // }
  if (!sortField) {
    sortField = '-createdAt'
  }
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 24
  const skip = (page - 1) * limit

  const nbHits = await Sample.find(search)

  try {
    const result = await Sample.find(search)
      .sort(sortField)
      .skip(skip)
      .limit(limit)
    return new Response(
      JSON.stringify(
        {
          status: true,
          msg: 'Search Result',
          nbHits: nbHits.length,
          result,
        },
        { status: StatusCodes.OK }
      )
    )
  } catch (error) {
    mongooseErrorHandler(error)
  }
}
