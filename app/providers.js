'use client'
import { ConfigProvider } from 'antd'
import { theme } from './styles/theme'
import { RootStyleRegistry } from '@/lib/styles/antRegistry'
import StyledComponentsRegistry from '@/lib/styles/styledRegistry'
import { Provider } from 'react-redux'
import store from '@/store'

export function Providers({ children }) {
  return (
    <>
      <StyledComponentsRegistry>
        <RootStyleRegistry>
          <ConfigProvider theme={theme}>
            <Provider store={store}>{children}</Provider>
          </ConfigProvider>
        </RootStyleRegistry>
      </StyledComponentsRegistry>
    </>
  )
}
