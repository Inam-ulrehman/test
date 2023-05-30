'use client'
import { Typography } from 'antd'
import { CldImage } from 'next-cloudinary'
import styled from 'styled-components'
const { Title, Paragraph } = Typography

const src =
  'https://res.cloudinary.com/inam6530/image/upload/v1678717865/Inamwebsolutions-nextjs/Fresh_INAMWEBSOLUTIONS_hh0krz.png'

const Image = () => {
  return (
    <Wrapper>
      <Title>Contact Us</Title>
      <Paragraph>
        Have questions, feedback, or inquiries? We'd love to hear from you! Our
        team is ready to assist you and provide the information you need.
      </Paragraph>
      <div className='image'>
        <CldImage
          src={src}
          width={720}
          height={720}
          alt='Contact us'
          priority
        />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .image {
    max-width: 400px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  @media (max-width: 992px) {
    .image {
      display: none;
    }
  }
`
export default Image
