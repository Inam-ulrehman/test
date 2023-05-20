'use client'
import { Button, DatePicker, Space } from 'antd'
import React from 'react'

const Ant = () => {
  return (
    <div>
      <DatePicker />
      <Button type='primary'>Primary Button</Button>
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
