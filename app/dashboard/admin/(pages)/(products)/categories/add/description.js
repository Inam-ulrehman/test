'use client'

import { Button } from 'antd'

const Description = ({ handleDescription }) => {
  console.log('hello from description')
  return (
    <div>
      <Button type='primary' onClick={handleDescription}>
        Primary
      </Button>
    </div>
  )
}

export default Description
