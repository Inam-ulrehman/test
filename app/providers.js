'use client'
import { ConfigProvider } from 'antd'
import customTheme from './styles/theme'

export function Providers({ children }) {
  return (
    <>
      <ConfigProvider theme={customTheme()}>{children}</ConfigProvider>
    </>
  )
}
