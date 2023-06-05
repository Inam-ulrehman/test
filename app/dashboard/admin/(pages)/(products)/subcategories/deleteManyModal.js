import { getStateValues } from '@/features/contacts/contactsSlice'
import { customFetch } from '@/lib/axios/customFetch'
import { ExclamationCircleFilled, DeleteOutlined } from '@ant-design/icons'
import { App, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

export const DeleteManyModal = ({ record }) => {
  const dispatch = useDispatch()
  const { revalidate, deleteMany } = useSelector((state) => state.contacts)
  const { modal, notification } = App.useApp()
  const showConfirm = async () => {
    modal.confirm({
      title: 'Do you want to delete all these items?',
      icon: <ExclamationCircleFilled />,
      content:
        'This action is irreversible and will permanently remove the item from the system. Please note that all associated data and records related to this item will also be deleted.',
      async onOk() {
        try {
          const response = await customFetch.post(
            '/authadmin/contact/deletemany',
            {
              _id: deleteMany,
            }
          )
          notification.success({
            message: 'success',
            description: response.data.msg,
          })
          dispatch(getStateValues({ name: 'revalidate', value: !revalidate }))
          dispatch(getStateValues({ name: 'deleteMany', value: [] }))
        } catch (error) {
          notification.error({
            message: 'Error',
            description: error.response?.data?.msg,
          })
        }
        return
      },
      onCancel() {},
    })
  }
  return (
    <Button
      disabled={deleteMany.length === 0}
      onClick={showConfirm}
      icon={<DeleteOutlined />}
    >
      Delete All
    </Button>
  )
}
