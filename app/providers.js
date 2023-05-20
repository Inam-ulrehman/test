'use client'
import { ConfigProvider } from 'antd'
import { theme } from './styles/theme'
import { RootStyleRegistry } from '@/lib/styles/antRegistry'
import StyledComponentsRegistry from '@/lib/styles/styledRegistry'

export function Providers({ children }) {
  return (
    <>
      <RootStyleRegistry>
        <StyledComponentsRegistry>
          {/* <ConfigProvider theme={theme}>{children}</ConfigProvider> */}
          {children}
        </StyledComponentsRegistry>
      </RootStyleRegistry>
    </>
  )
}
