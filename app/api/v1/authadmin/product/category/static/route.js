import dbConnect from '@/lib/dbConnect'
import mongooseErrorHandler from '@/lib/errors/mongoose-error-handler'
import Category from '@/models/product/Category'

import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

export async function GET(request, res) {
  await dbConnect()

  try {
    const nbHits = await Category.countDocuments({})
    const result = await Category.find({})

    return NextResponse.json(
      { success: true, msg: 'Search Results', nbHits, result },
      { status: StatusCodes.OK }
    )
  } catch (error) {
    return mongooseErrorHandler(error)
  }
}
