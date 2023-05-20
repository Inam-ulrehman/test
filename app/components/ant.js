'use client'
import { Button, DatePicker, Divider, Space } from 'antd'
import React from 'react'

const Ant = () => {
  return (
    <div>
      <DatePicker />
      <Button type='primary'>Primary Button</Button>
      <Divider />
      <Space wrap>
        <Button type='primary'>Primary Button</Button>
        <Button>Default Button</Button>
        <Button type='dashed'>Dashed Button</Button>
        <Button type='text'>Text Button</Button>
        <Button type='link'>Link Button</Button>
      </Space>
    </div>
  )
}

export default Ant
