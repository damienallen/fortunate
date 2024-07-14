import { useEffect, useState } from 'react'

import { FastForwardCircle } from '@phosphor-icons/react/FastForwardCircle'
import { Tag } from '@phosphor-icons/react'
import { Paper } from '@mantine/core'

interface Epigram {
    category: string
    text: string
}

const fetchEpigram = async () => {
    const response = await fetch('http://localhost:8000/epigram/random')
    const epigram = await response.json()
    return epigram as Epigram
}

const hashCode = (text: string) =>
    text
        .split('')
        .reduce((prevHash, currVal) => ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0, 0)

export const Epigram = () => {
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
        <div
            style={{
                flex: '1 1 100vh',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Paper shadow="md" radius="md" withBorder p="xl">
                <div>
                    {epigram.split('\n').map((str) => (
                        <p key={hashCode(str)}>{str}</p>
                    ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', opacity: 0.7 }}>
                    <Tag weight="fill" style={{ marginRight: 8 }} /> {category}
                </div>
            </Paper>

            <a onClick={randomize}>
                <FastForwardCircle size={32} weight="fill" />
            </a>
        </div>
    )
}
