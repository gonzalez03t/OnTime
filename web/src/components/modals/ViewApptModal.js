import React from 'react'
import { Button, Modal } from 'semantic-ui-react';

export default function ViewApptModal({open, appointment, onClose}) {
    return (
        <Modal
        open={open}
        size="mini"
        onClose={onClose}
        >
        <Modal.Header>{appointment?.title}</Modal.Header>
        <Modal.Content>
            <p>Description:</p>
            <p>Start Time:{appointment?.start.toString()}</p>
            <p>End Time:{appointment?.start.toString()}</p>
        </Modal.Content>
        <Modal.Actions>
            <Button onClick={onClose}>
            Cancel
            </Button>
            <Button positive onClick={() => alert("TODO")}>
            More Details
            </Button>
        </Modal.Actions>
        </Modal>
    )
}
