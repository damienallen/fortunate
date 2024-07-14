import { useEffect, useRef, useState } from 'react'

import { useInterval } from 'usehooks-ts'
import { Tag } from '@phosphor-icons/react'
import { Paper } from '@mantine/core'
import { Controls } from './Controls'

interface Epigram {
    category: string
    text: string
}

interface EpigramWidgetProps {
    setModalOpen: CallableFunction
}

const minDelay = 5000

export const EpigramWidget = (props: EpigramWidgetProps) => {
    const [category, setCategory] = useState<string>('')
    const [epigram, setEpigram] = useState<string>('')

    const [isPlaying, setIsPlaying] = useState<boolean>(true)
    const [progress, setProgress] = useState<number>(0)
    const [delay, setDelay] = useState<number>(minDelay)

    const timerRef = useRef<any>()
    useInterval(() => setProgress(progress + 5), isPlaying ? delay / 20 : null)

    const updateTimer = () => {
        setProgress(0)
        clearTimeout(timerRef.current)

        if (isPlaying && epigram) {
            const timeout = Math.max(epigram.length * 100, minDelay)
            setDelay(timeout)
            timerRef.current = setTimeout(() => randomize(), timeout)
            console.debug(`Timer set for ${timeout} ms`)
        } else {
            console.debug('Paused, no timer set')
            setProgress(100)
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
                <Controls
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    randomize={randomize}
                    setModalOpen={props.setModalOpen}
                    progress={progress}
                />
            </div>
        </>
    )
}

const fetchEpigram = async () => {
    const response = await fetch('http://localhost:8000/epigram/random')
    const epigram = await response.json()
    return epigram as Epigram
}
