import '@mantine/core/styles.css'
import { Epigram } from './Epigram'
import { Header } from './Header'
import { createTheme, MantineProvider } from '@mantine/core'

const theme = createTheme({
    /** Your theme override here */
})

export const App = () => {
    return (
        <MantineProvider theme={theme} defaultColorScheme="dark">
            <div
                style={{
                    margin: 0,
                    padding: 0,
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                }}
            >
                <Header />
                <Epigram />
            </div>
        </MantineProvider>
    )
}
