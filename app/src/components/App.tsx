import '@mantine/core/styles.css'
import { EpigramWidget } from './EpigramWidget'
import { Header } from './Header'
import { createTheme, MantineProvider } from '@mantine/core'
import { useState } from 'react'
import { AddModal } from './AddModal'
import { Notifications } from '@mantine/notifications'

const theme = createTheme({
    primaryColor: 'gray',
})

export const App = () => {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <MantineProvider theme={theme} defaultColorScheme="auto">
            <AddModal open={modalOpen} close={() => setModalOpen(false)} />
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
                <EpigramWidget setModalOpen={setModalOpen} />
            </div>
            <Notifications style={{ position: 'absolute', bottom: 16, right: 16 }} />
        </MantineProvider>
    )
}
