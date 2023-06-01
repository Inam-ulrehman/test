import { EditOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { DeleteItemModal } from './deleteItemModal'
import Link from 'next/link'

export const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
    // sorter: (a, b) => a.name.length - b.name.length,
    // sortDirections: ['descend'],
  },
  {
    title: 'Subject',
    dataIndex: 'subject',
    key: 'subject',
    ellipsis: true,
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
    key: 'mobile',
    ellipsis: true,
  },
  {
    title: 'Time',
    dataIndex: 'date',
    key: 'date',
    // defaultSortOrder: 'descend',
    sorter: (a, b) => a.mobile - b.mobile,
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        <Link href={`/dashboard/admin/contacts/${record._id}`}>
          <Button icon={<EditOutlined />}></Button>
        </Link>

        <DeleteItemModal record={record} />
      </Space>
    ),
  },
]

//
