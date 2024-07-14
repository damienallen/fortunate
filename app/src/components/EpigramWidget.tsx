import { useEffect, useState } from 'react'

import { FastForwardCircle } from '@phosphor-icons/react/FastForwardCircle'
import { PauseCircle, PlusCircle, Tag } from '@phosphor-icons/react'
import { Paper } from '@mantine/core'

interface Epigram {
    category: string
    text: string
}

interface EpigramWidgetProps {
    setModalOpen: CallableFunction
}

export const EpigramWidget = (props: EpigramWidgetProps) => {
    const [category, setCategory] = useState<string>('')
    const [epigram, setEpigram] = useState<string>('')

    const randomize = () => {
        fetchEpigram().then((epigram) => {
            setCategory(epigram.category)
            setEpigram(epigram.text)
            console.debug(epigram.text)
        })
    }

    useEffect(() => randomize(), [])

    return (
        <>
            <div
                style={{
                    flex: '1 1 100vh',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 16,
                }}
            >
                <Paper
                    style={{ maxWidth: 640, width: '100vw', padding: '8px 32px' }}
                    shadow="md"
                    radius="lg"
                    withBorder
                >
                    <div>
                        {epigram.split('\n').map((str) => (
                            <p key={hash(str)}>{str}</p>
                        ))}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            opacity: 0.6,
                            paddingBottom: 16,
                            gap: 8,
                        }}
                    >
                        {category} <Tag weight="fill" />
                    </div>
                </Paper>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                    }}
                >
                    <a onClick={randomize}>
                        <PauseCircle size={32} weight="fill" />
                    </a>
                    <a onClick={randomize}>
                        <FastForwardCircle size={32} weight="fill" />
                    </a>
                    <a onClick={() => props.setModalOpen(true)}>
                        <PlusCircle size={32} weight="fill" />
                    </a>
                </div>
            </div>
        </>
    )
}

const fetchEpigram = async () => {
    const response = await fetch('http://localhost:8000/epigram/random')
    const epigram = await response.json()
    return epigram as Epigram
}

const hash = (text: string) =>
    text
        .split('')
        .reduce((prevHash, currVal) => ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0, 0)
