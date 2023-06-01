import { getStateValues } from '@/features/contacts/contactsSlice'
import { Button, Table } from 'antd'
import moment from 'moment'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { columns } from './columns'
import { DeleteManyModal } from './deleteManyModal'

const List = () => {
  const dispatch = useDispatch()
  const { contacts } = useSelector((state) => state)
  const { list, deleteMany, isLoading } = contacts

  const data = list?.map((item) => {
    const key = item._id
    const date = moment(item.createdAt).format('MMM Do YY')
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
      <DeleteManyModal />
      <div>
        <Table
          pagination={false}
          rowSelection={{
            type: 'checkbox',
            onChange: (e) => handleChange(e),
          }}
          dataSource={data}
          columns={columns}
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
  td {
    :nth-child(3) {
      max-width: 100px;
    }
    :nth-child(5) {
      max-width: 100px;
    }
  }
  td {
    :nth-child(4) {
      max-width: 120px;
    }
  }

  @media (max-width: 768px) {
    .desktop {
      th,
      td {
        padding: 5px 0 !important;
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
