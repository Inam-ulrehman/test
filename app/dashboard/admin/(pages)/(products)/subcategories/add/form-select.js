import { Form, Select } from 'antd'
import { useState } from 'react'
const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters']
const FormSelect = () => {
  const [selectedItems, setSelectedItems] = useState([])
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o))
  const handleSelectChange = (selectedItems) => {
    setSelectedItems(selectedItems)
    console.log(selectedItems)
  }
  return (
    <Form.Item
      label='Category'
      name='category'
      rules={[{ required: true, message: 'Please pick a category' }]}
    >
      <Select
        mode='multiple'
        placeholder='Select Category'
        value={selectedItems}
        onChange={handleSelectChange}
        style={{
          width: '100%',
        }}
        options={filteredOptions.map((item) => ({
          value: item,
          label: item,
        }))}
      />
    </Form.Item>
  )
}
export default FormSelect
