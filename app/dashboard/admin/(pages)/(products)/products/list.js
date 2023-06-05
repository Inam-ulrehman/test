import { getStateValues } from '@/features/contacts/contactsSlice'
import { Button, Table } from 'antd'
import moment from 'moment'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { columns } from './columns'
import { DeleteManyModal } from './deleteManyModal'
import { formatGmailDate } from '@/lib/helper'
import { FileAddOutlined } from '@ant-design/icons'
import Link from 'next/link'

const List = () => {
  const dispatch = useDispatch()
  const { contacts } = useSelector((state) => state)
  const { list, deleteMany, isLoading } = contacts

  const data = list?.map((item) => {
    const key = item._id

    const date = formatGmailDate(item.createdAt)
    return {
      ...item,
      key,
      date,
    }
  })
  const handleChange = (value) => {
    dispatch(getStateValues({ name: 'deleteMany', value: value }))
  }

  return (
    <Wrapper>
      <div className='delete-many'>
        <DeleteManyModal />
        <Link href='/dashboard/admin/products/add'>
          <Button type='primary' icon={<FileAddOutlined />}>
            New Product
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
