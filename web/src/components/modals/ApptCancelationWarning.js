import React, { useState } from 'react';
import { useHistory } from 'react-router';
import okResponse from '../../utils/okResponse';
import { Button, Modal, Header, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { cancelUserAppointment } from '../../api/appointment';

export default function ApptCancelationModal({
  open,
  onClose,
  onCloseParent,
  appointmentID,
  personFirstName,
  personLastName,
  when,
  time,
}) {
  const history = useHistory();
  const [cancelationConfirmation, setCancelationConfirmation] = useState(false);

  const cancelAppointment = async () => {
    const res = await cancelUserAppointment(appointmentID);

    if (okResponse(res)) {
      displayConfirmation();
      history.push('/dashboard');
    } else {
      console.log(res);
      alert('ruh roh!');
    }
  };

  function displayConfirmation() {
    setCancelationConfirmation(true);
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
          <Button
            negative
            onClick={() => cancelAppointment()}
            as={Link}
            to="/dashboard"
          >
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
