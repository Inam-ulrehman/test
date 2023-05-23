import { Button, Space } from 'antd'
import React from 'react'
import styled from 'styled-components'

import {
  GithubOutlined,
  InstagramOutlined,
  TwitterCircleFilled,
  YoutubeOutlined,
} from '@ant-design/icons'
import Link from 'next/link'

const SocialIcons = () => {
  return (
    <Wrapper>
      <Space wrap>
        <Link href={'https://www.youtube.com'} target='_blank'>
          <Button icon={<YoutubeOutlined />}></Button>
        </Link>
        <Link href={'https://www.twitter.com'} target='_blank'>
          <Button icon={<TwitterCircleFilled />}></Button>
        </Link>
        <Link href={'https://www.instagram.com'} target='_blank'>
          <Button icon={<InstagramOutlined />}></Button>
        </Link>
        <Link href={'https://www.github.com'} target='_blank'>
          <Button icon={<GithubOutlined />}></Button>
        </Link>
      </Space>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-right: 1rem;
`
export default SocialIcons
