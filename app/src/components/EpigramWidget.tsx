import { useEffect, useRef, useState } from 'react'

import { FastForwardCircle } from '@phosphor-icons/react/FastForwardCircle'
import { PauseCircle, PlayCircle, PlusCircle, Tag } from '@phosphor-icons/react'
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
    const [isPlaying, setIsPlaying] = useState<boolean>(true)
    const timerRef = useRef<any>()

    const updateTimer = () => {
        clearTimeout(timerRef.current)
        if (isPlaying && epigram) {
            const timeout = Math.max(epigram.length * 100, 5000)
            timerRef.current = setTimeout(() => randomize(), timeout)

            console.debug(`Timer set for ${timeout} ms`)
        } else {
            console.debug('Paused, no timer set')
        }
    }

    const randomize = () => {
        fetchEpigram().then((item) => {
            setCategory(item.category)
            setEpigram(item.text)
        })
    }

    useEffect(() => randomize(), [])
    useEffect(() => updateTimer(), [isPlaying, epigram])

    return (
        <>
            <div
                style={{
                    flex: 1,
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
                        {epigram.split('\n').map((str, ind) => (
                            <p key={ind}>{str}</p>
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
                    <a onClick={() => setIsPlaying(!isPlaying)}>
                        {isPlaying ? (
                            <PauseCircle size={32} weight="fill" />
                        ) : (
                            <PlayCircle size={32} weight="fill" />
                        )}
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
