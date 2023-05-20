'use client'
import { ConfigProvider } from 'antd'
import { theme } from './styles/theme'
console.log(theme)

export function Providers({ children }) {
  return (
    <>
      <ConfigProvider theme={theme}>{children}</ConfigProvider>
    </>
  )
}
