import { MantineProvider } from '@mantine/core'
import { Layout } from './Layout'
import { theme } from '../theme'

export const App = () => {
  return (
    <MantineProvider theme={theme}>
      <Layout />
    </MantineProvider>
  )
}

