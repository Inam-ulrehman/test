import { Button, Drawer, Space } from 'antd'
import { useState } from 'react'
import { MenuOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import NavMenu from './drawer-NavMenu'
const MobileNavbarDrawer = ({ isMember }) => {
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
        placement='left'
        width={300}
        onClose={onClose}
        open={open}
      >
        <NavMenu setOpen={setOpen} isMember={isMember} />
      </Drawer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .menu-button {
    margin-left: 1rem;
  }
`
export default MobileNavbarDrawer
