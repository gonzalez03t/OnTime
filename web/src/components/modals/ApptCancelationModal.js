import React from 'react';
import { Button, Modal, Header } from 'semantic-ui-react';
import { cancelAppointment } from '../../api/appointment';
import useToggle from '../../hooks/useToggle';
import useStore from '../../store/store';
import okResponse from '../../utils/okResponse';

export default function ApptCancelationModal({
  open,
  onClose,
  appointmentId,
  client,
  employee,
  when,
  time,
}) {
  const [loading, { on, off }] = useToggle(false);

  const notify = useStore((state) => state.addNotification);

  console.log(appointmentId);

  async function handleCancelAppointment() {
    if (!appointmentId) return;

    on();
    const res = await cancelAppointment(appointmentId, client?.id);
    off();

    if (okResponse(res)) {
      notify('success', 'Cancelled appointment');
    } else {
      console.log(res);
      notify('error', 'Failed to cancel appointment');
    }
  }

  const renderName = () => {
    let user = client ?? employee;
    return `${user?.firstName} ${user?.lastName}`;
  };

  return (
    <React.Fragment>
      <Modal open={open} size="tiny" onClose={onClose}>
        <Modal.Content>
          <Header as="h3">Cancel Appointment</Header>
          <p>
            Are you sure you want to cancel your appointment with{' '}
            <b>{renderName()}</b> on {when} at {time}?
          </p>
          <p>The appointment and associated records will be deleted. </p>
        </Modal.Content>
        <Modal.Actions large>
          <Button primary onClick={onClose} loading={loading}>
            {' '}
            No{' '}
          </Button>
          <Button negative onClick={handleCancelAppointment} loading={loading}>
            {' '}
            Yes{' '}
          </Button>
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  );
}
