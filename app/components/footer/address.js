import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

const nav = [
  {
    name: '86 Cedar Street,Kitchener, ON, N2G 3L8',
    target: '_blank',
    link: 'https://www.google.com/maps/@43.4450731,-80.4859129,17z',
  },
  { name: '+1-416-560-6790', link: 'tel:4165606790' },
  {
    target: '',
    name: 'support@inamwebsolutions.com',
    target: '',
    link: 'mailto:Support@inamwebsolutions.com',
  },
]
const Address = () => {
  return (
    <Wrapper>
      <p>Our Address</p>
      <ul className='container'>
        {nav.map((item, index) => {
          return (
            <li key={index}>
              <Link href={item.link} target={item.target}>
                {item.name}
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
    display: grid;
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

export default Address
