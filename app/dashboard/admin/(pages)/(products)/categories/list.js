import { Button, Image, Table } from 'antd'
import moment from 'moment'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { columns } from './columns'
import { DeleteManyModal } from './deleteManyModal'
import { formatGmailDate } from '@/lib/helper'
import { FileAddOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { getStateValues } from '@/features/products/categoriesSlice'
const url =
  'https://res.cloudinary.com/inam6530/image/upload/v1686240165/Inamwebsolutions-nextjs/szm6vst9cxqofzaukoil.png'
const List = () => {
  const dispatch = useDispatch()
  const { categories } = useSelector((state) => state)
  const { list, deleteMany, isLoading } = categories

  const data = list?.map((item) => {
    const key = item._id
    const src = item.images[0]?.url
    const date = formatGmailDate(item.createdAt)
    return {
      ...item,
      key,
      date,
      image: <Image width={94} height={79} src={src} fallback={url} />,
    }
  })
  const handleChange = (value) => {
    dispatch(getStateValues({ name: 'deleteMany', value: value }))
  }

  return (
    <Wrapper>
      <div className='delete-many'>
        <DeleteManyModal />
        <Link href='/dashboard/admin/categories/add'>
          <Button type='primary' icon={<FileAddOutlined />}>
            New Category
          </Button>
        </Link>
      </div>

      <div className='table-container'>
        <Table
          pagination={false}
          rowSelection={{
            type: 'checkbox',
            onChange: (e) => handleChange(e),
          }}
          dataSource={data}
          columns={columns}
          loading={isLoading}
        />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .ant-table-cell,
  .ant-table-row {
    width: 100%;
  }
`
export default List
