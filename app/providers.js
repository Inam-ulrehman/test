'use client'
import { ConfigProvider } from 'antd'
import { theme } from './styles/theme'
import { RootStyleRegistry } from '@/lib/antRegistry'

export function Providers({ children }) {
  return (
    <>
      <RootStyleRegistry>
        <ConfigProvider theme={theme}>{children}</ConfigProvider>
      </RootStyleRegistry>
    </>
  )
}
