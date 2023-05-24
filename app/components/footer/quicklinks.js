import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

const nav = [
  { name: 'Home', link: '/' },
  { name: 'About', link: '/about' },
  { name: 'Samples', link: '/samples' },
  { name: 'Contact', link: '/contact' },
  { name: 'Login', link: '/login' },
  { name: 'Register', link: '/register' },
]
const QuickLinks = () => {
  return (
    <Wrapper>
      <p>Quick Links</p>
      <ul className='container'>
        {nav.map((item, index) => {
          return (
            <li key={index}>
              <Link href={item.link}>{item.name}</Link>
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
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  li {
    padding: 0.3rem 0;
  }
  a {
    :hover {
      color: var(--primary-5);
    }
  }
`

export default QuickLinks
