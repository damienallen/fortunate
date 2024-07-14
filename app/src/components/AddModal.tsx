import { Button, Modal, Textarea } from '@mantine/core'
import { useState } from 'react'
import { notifications } from '@mantine/notifications'

interface AddModalProps {
    open: boolean
    close: CallableFunction
}

const minLength = 5

export const AddModal = (props: AddModalProps) => {
    const [value, setValue] = useState('')

    const addEpigram = async (text: string) => {
        const response = await fetch(
            `http://localhost:8000/epigram/add?${new URLSearchParams({ text: text })}`,
            {
                method: 'POST',
            }
        )

        if (response.status !== 201) {
            const message = `Failed to send custom epigram: ${response.status} ${response.statusText}`
            console.error(message)
            notifications.show({
                title: 'Error!',
                message: message,
                color: 'red',
                autoClose: 6000,
            })
        } else {
            notifications.show({
                title: 'Success!',
                message: 'Custom epigram added to DB',
                color: 'green',
            })
        }
    }

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
