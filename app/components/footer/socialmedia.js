import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import {
  GithubOutlined,
  InstagramOutlined,
  TwitterCircleFilled,
  YoutubeOutlined,
} from '@ant-design/icons'

const nav = [
  { icon: <GithubOutlined></GithubOutlined>, link: 'https://www.github.com' },
  {
    icon: <InstagramOutlined></InstagramOutlined>,
    link: 'https://www.instagram.com',
  },
  {
    icon: <TwitterCircleFilled></TwitterCircleFilled>,
    link: 'https://www.twitter.com',
  },
  {
    icon: <YoutubeOutlined></YoutubeOutlined>,
    link: 'https://www.youtube.com',
  },
]
const SocialMedia = () => {
  return (
    <Wrapper>
      <p>Social Media</p>
      <ul className='container'>
        {nav.map((item, index) => {
          return (
            <li key={index}>
              <Link href={item.link} target='_blank'>
                <Button icon={item.icon}></Button>
              </Link>
            </li>
          )
        })}
      </ul>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  p {
    font-size: large;
    font-weight: 600;
  }
  .container {
    display: flex;
    gap: 1rem;
  }
`

export default SocialMedia
