import { EditOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { DeleteItemModal } from './deleteItemModal'

export const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Subject',
    dataIndex: 'subject',
    key: 'subject',
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
    key: 'mobile',
  },
  {
    title: 'Time',
    dataIndex: 'date',
    key: 'date',
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

        <DeleteItemModal record={record} />
      </Space>
    ),
  },
]

//
