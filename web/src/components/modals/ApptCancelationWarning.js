import React, { useState } from 'react';
import { Button, Modal, Header, Message } from 'semantic-ui-react';

export default function ApptCancelationModal({
  open,
  onClose,
  onCloseParent,
  personFirstName,
  personLastName,
  when,
  time,
}) {
  const [cancelationConfirmation, setCancelationConfirmation] = useState(false);

  function cancelAppointment() {
    // TODO: Cancel appointment
    alert('Cancel appointment: TODO');
    displayConfirmation();
  }

  function displayConfirmation() {
    setCancelationConfirmation(true);
    console.log(cancelationConfirmation);
    // Close Appointment Cancelation Modal
    onClose();

    // Display cancelation message
    setTimeout(() => {
      setCancelationConfirmation(false);
    }, 2500);

    // Close Appointment Detail Modal
    onCloseParent();
  }

  return (
    <React.Fragment>
      <Modal open={open} size="tiny" onClose={onClose}>
        <Modal.Content>
          <Header as="h3">Cancel Appointment</Header>
          <p>
            Are you sure you want to cancel your appointment with{' '}
            <b>
              {personFirstName} {personLastName}
            </b>{' '}
            on {when} at {time}?
          </p>
          <p>The appointment and associated records will be deleted. </p>
        </Modal.Content>
        <Modal.Actions large>
          <Button primary onClick={() => onClose()}>
            {' '}
            No{' '}
          </Button>
          <Button negative onClick={() => cancelAppointment()}>
            {' '}
            Yes{' '}
          </Button>
        </Modal.Actions>
      </Modal>

      <Modal open={cancelationConfirmation} size="tiny" onClose={onClose}>
        <Modal.Content style={{ padding: '0px' }}>
          <Message
            style={{ padding: '30px', textAlign: 'center' }}
            success
            header="Your appointment cancelation was successful"
          />
        </Modal.Content>
      </Modal>
    </React.Fragment>
  );
}
