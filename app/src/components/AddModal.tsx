import { Button, Modal, Textarea } from '@mantine/core'
import { useState } from 'react'

interface AddModalProps {
    open: boolean
    close: CallableFunction
}

const minLength = 5

const addEpigram = async (text: string) => {
    const response = await fetch(
        `http://localhost:8000/epigram/add?${new URLSearchParams({ text: text })}`,
        {
            method: 'POST',
        }
    )

    if (response.status !== 201) {
        console.error(`Failed to send custom epigram: ${response.status} ${response.statusText}`)
    }
}

export const AddModal = (props: AddModalProps) => {
    const [value, setValue] = useState('')

    const onSubmit = () => {
        addEpigram(value)
        setValue('')
        props.close()
    }

    return (
        <>
            <Modal
                opened={props.open}
                onClose={() => props.close()}
                title="Add Custom Epigram"
                centered
            >
                <Textarea
                    value={value}
                    onChange={(event) => setValue(event.currentTarget.value)}
                    variant="filled"
                    radius="md"
                    placeholder="Compose your own..."
                    maxRows={12}
                    minRows={2}
                    autosize
                />
                <Button
                    onClick={onSubmit}
                    style={{ marginTop: 16 }}
                    variant="filled"
                    disabled={value.length < minLength}
                >
                    Submit
                </Button>
            </Modal>
        </>
    )
}
