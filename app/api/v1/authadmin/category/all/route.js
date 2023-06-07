import dbConnect from '@/lib/dbConnect'
import mongooseErrorHandler from '@/lib/errors/mongoose-error-handler'
import Category from '@/models/product/Category'

import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

export async function GET(request, res) {
  const searchParams = request.nextUrl.searchParams

  await dbConnect()

  const name = searchParams.get('search')
  let sortField = searchParams.get('sort')
  const searchPage = searchParams.get('page')
  const searchLimit = searchParams.get('limit')

  let query = []
  let sort = {}

  if (name) {
    query = [...query, { name: { $regex: name, $options: 'i' } }]
  }

  let search = {
    $or: query,
  }
  if (!name) {
    search = {}
  }

  if (!sortField) {
    sortField = '-createdAt'
  }
  const page = Number(searchPage) || 1
  const limit = Number(searchLimit) || 10
  const skip = (page - 1) * limit
  const nbHits = await Category.countDocuments(search)
  try {
    const result = await Category.find(search)
      .sort(sortField)
      .skip(skip)
      .limit(limit)
    return NextResponse.json(
      { success: true, msg: 'Search Results', nbHits, result },
      { status: StatusCodes.OK }
    )
  } catch (error) {
    return mongooseErrorHandler(error)
  }
}
