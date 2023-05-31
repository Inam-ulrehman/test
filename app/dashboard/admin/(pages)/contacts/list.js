import { getStateValues } from '@/features/contacts/contactsSlice'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Space, Table } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

const List = () => {
  const dispatch = useDispatch()
  const { contacts } = useSelector((state) => state)
  const { list, deleteMany, isLoading } = contacts

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.mobile - b.mobile,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button
            onClick={() => console.log('read')}
            icon={<EditOutlined />}
          ></Button>
          <Button
            onClick={() => console.log(`Delete ${record._id}`)}
            icon={<DeleteOutlined />}
          ></Button>
        </Space>
      ),
    },
  ]

  const data = list?.map((item) => {
    const key = item._id
    return {
      ...item,
      key,
    }
  })
  const handleChange = (value) => {
    dispatch(getStateValues({ name: 'deleteMany', value: value }))
  }
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  return (
    <Wrapper>
      <Button disabled={deleteMany.length === 0}>Delete All</Button>
      <div>
        <Table
          className='desktop'
          pagination={false}
          rowSelection={{
            type: 'checkbox',
            onChange: (e) => handleChange(e),
          }}
          dataSource={data}
          columns={columns}
          onChange={onChange}
          loading={isLoading}
          expandable={{
            expandedRowRender: (record) => (
              <p
                style={{
                  margin: 0,
                }}
              >
                {record.message}
              </p>
            ),
            rowExpandable: (record) => record.name !== 'Not Expandable',
          }}
        />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  @media (max-width: 768px) {
    .desktop {
      th,
      td {
        /* display: none; */
        :nth-child(4) {
          display: none;
        }
        :nth-child(5) {
          display: none;
        }
      }
    }
  }
`
export default List
