import { staticCategoriesThunk } from '@/features/products/categoriesSlice'
import { getStateValues } from '@/features/products/subcategoriesSlice'
import { customFetch } from '@/lib/axios/customFetch'
import { App, Form, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SelectComponent = () => {
  const { notification } = App.useApp()
  const dispatch = useDispatch()
  const { staticData, staticLoading } = useSelector((state) => state.categories)
  const { selectedItems, categories } = useSelector(
    (state) => state.subcategories
  )

  const handleChange = (selectedItems) => {
    const array1 = selectedItems
    const array2 = staticData

    function filterArrayByIds(array1, array2) {
      const ids = new Set(array1) // Convert the first array to a Set for efficient lookup
      return array2.filter((obj) => ids.has(obj.name)).map((obj) => obj._id)
    }
    const categories = filterArrayByIds(array1, array2)
    dispatch(getStateValues({ name: 'categories', value: categories }))
    dispatch(getStateValues({ name: 'selectedItems', value: selectedItems }))
  }

  useEffect(() => {
    // get categories
    dispatch(staticCategoriesThunk({ notification }))
  }, [])
  return (
    <Form.Item
      label='Category'
      name='categories'
      rules={[{ required: true, message: 'please enter a category' }]}
    >
      <Select
        mode='multiple'
        placeholder={staticLoading ? 'Loading...' : 'Select Category'}
        value={selectedItems}
        onChange={handleChange}
        style={{
          width: '100%',
        }}
        options={staticData.map((item) => ({
          value: item.name,
          label: item.name,
        }))}
        loading={staticLoading}
        disabled={staticLoading}
      />
    </Form.Item>
  )
}
export default SelectComponent
