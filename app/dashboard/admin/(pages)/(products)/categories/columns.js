import { EditOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { DeleteItemModal } from './deleteItemModal'
import Link from 'next/link'

export const columns = [
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    ellipsis: true,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,

    // sorter: (a, b) => a.name.length - b.name.length,
    // sortDirections: ['descend'],
  },

  {
    title: 'Time',
    dataIndex: 'date',
    key: 'date',
    width: 110,
    responsive: ['md'],

    // defaultSortOrder: 'descend',
    sorter: (a, b) => a.mobile - b.mobile,
  },

  {
    title: 'Action',
    key: 'action',
    width: 120,
    render: (_, record) => (
      <Space size='middle'>
        <Link href={`/dashboard/admin/categories/${record._id}`}>
          <Button icon={<EditOutlined />}></Button>
        </Link>

        <DeleteItemModal record={record} />
      </Space>
    ),
  },
]

//
