import { FastForwardCircle } from '@phosphor-icons/react/FastForwardCircle'
import { Pause, Play, PlusCircle } from '@phosphor-icons/react'
import { Center, rem, RingProgress, useMantineColorScheme } from '@mantine/core'

interface ControlsProps {
    isPlaying: boolean
    setIsPlaying: CallableFunction
    setModalOpen: CallableFunction
    randomize: CallableFunction
    progress: number
}

export const Controls = (props: ControlsProps) => {
    const { colorScheme } = useMantineColorScheme()

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
            }}
        >
            <a style={{ marginBottom: 8 }} onClick={() => props.setIsPlaying(!props.isPlaying)}>
                <RingProgress
                    size={32}
                    thickness={2}
                    sections={[
                        {
                            value: props.progress,
                            color: colorScheme === 'dark' ? 'white' : 'black',
                            opacity: 0.8,
                        },
                    ]}
                    label={
                        <Center>
                            {props.isPlaying ? (
                                <Pause style={{ width: rem(12), height: rem(12) }} weight="fill" />
                            ) : (
                                <Play style={{ width: rem(12), height: rem(12) }} weight="fill" />
                            )}
                        </Center>
                    }
                />
            </a>

            <a onClick={() => props.randomize()}>
                <FastForwardCircle size={32} weight="fill" />
            </a>
            <a onClick={() => props.setModalOpen(true)}>
                <PlusCircle size={32} weight="fill" />
            </a>
        </div>
    )
}
