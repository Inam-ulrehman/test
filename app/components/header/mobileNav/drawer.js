import { Button, Drawer, Space } from 'antd'
import { useState } from 'react'
import { MenuOutlined } from '@ant-design/icons'
import styled from 'styled-components'
const MobileNavbarDrawer = () => {
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }
  return (
    <Wrapper>
      <Space>
        <Button
          className='menu-button'
          icon={<MenuOutlined />}
          onClick={showDrawer}
        ></Button>
      </Space>
      <Drawer
        title='Airbnb'
        placement='right'
        width={300}
        onClose={onClose}
        open={open}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .menu-button {
    margin-right: 1rem;
  }
`
export default MobileNavbarDrawer
