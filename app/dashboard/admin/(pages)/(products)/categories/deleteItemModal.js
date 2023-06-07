import { getStateValues } from '@/features/products/categoriesSlice'
import { customFetch } from '@/lib/axios/customFetch'
import { ExclamationCircleFilled, DeleteOutlined } from '@ant-design/icons'
import { App, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

export const DeleteItemModal = ({ record }) => {
  const dispatch = useDispatch()
  const { revalidate } = useSelector((state) => state.contacts)
  const { modal, notification } = App.useApp()
  const showConfirm = async (_id) => {
    modal.confirm({
      title: 'Do you want to delete these items?',
      icon: <ExclamationCircleFilled />,
      content:
        'This action is irreversible and will permanently remove the item from the system. Please note that all associated data and records related to this item will also be deleted.',
      async onOk() {
        try {
          const response = await customFetch.post(
            '/authadmin/category/delete',
            {
              _id,
            }
          )
          notification.success({
            message: 'success',
            description: response.data.msg,
          })
          dispatch(getStateValues({ name: 'revalidate', value: !revalidate }))
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
      onClick={() => showConfirm(record._id)}
      icon={<DeleteOutlined />}
    ></Button>
  )
}
