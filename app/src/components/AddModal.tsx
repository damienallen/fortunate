import { Button, Modal, Textarea } from '@mantine/core'

interface AddModalProps {
    open: boolean
    close: CallableFunction
}

export const AddModal = (props: AddModalProps) => {
    console.log(props)
    return (
        <>
            <Modal
                opened={props.open}
                onClose={() => props.close()}
                title="Add Custom Epigram"
                centered
            >
                <Textarea
                    autosize
                    minRows={2}
                    maxRows={12}
                    variant="filled"
                    radius="md"
                    placeholder="Compose your own..."
                />
                <Button style={{ marginTop: 16 }} variant="filled">
                    Submit
                </Button>
            </Modal>
        </>
    )
}
