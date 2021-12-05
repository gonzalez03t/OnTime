import React, { useState } from 'react';
import { Button, Modal, Header, Grid, Icon } from 'semantic-ui-react';
import AppointmentEmployeeCard from '../Appointment/AppointmentEmployeeCard';
import useStore from '../../store/store';
import shallow from 'zustand/shallow';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import ApptCancelationModal from './ApptCancelationModal';
import { getImageUrl } from '../../api/image';

export default function ViewApptModal({
  open,
  appointment,
  onClose,
  onRescheduleClick,
}) {
  const history = useHistory();

  console.log(appointment);

  const { fetchAppointments } = useStore((state) => state, shallow);

  const [showConfirm, setShowConfirm] = useState(false);

  const handleMoreDetailsClick = async () => {
    await fetchAppointments();
    history.push('/appointment_detail', { appointment });
  };

  let day = `${appointment?.start.toString().slice(0, 3)}, ${appointment?.start
    .toString()
    .slice(4, 15)}`;
  let time = `${appointment?.start
    .toString()
    .slice(16, 24)} ${appointment?.start.toString().slice(34, 57)}`;

  const { role } = useStore(
    (state) => ({
      role: state.user?.role,
    }),
    shallow
  );

  const openConfirmation = () => {
    setShowConfirm(true);
  };

  const closeConfirmation = () => {
    onClose();
    setShowConfirm(false);
  };

  const handleRescheduleClick = () => {
    // onClose();
    onRescheduleClick?.();
  };

  if (role === 'EMPLOYEE') {
    return (
      <React.Fragment>
        <Modal open={open} size="small" onClose={onClose} closeIcon>
          <Modal.Header>Appointment Details</Modal.Header>
          <Modal.Content>
            <Grid columns={2} stackable>
              <Grid.Row style={{ paddingTop: '5px' }}>
                <Grid.Column style={{ paddingTop: '15px' }}>
                  <Header as="h3">
                    Appointment with {appointment?.client.firstName}{' '}
                    {appointment?.client.lastName}
                  </Header>
                  <p>
                    <b>When:</b>
                  </p>
                  <p>
                    {' '}
                    <Icon name="calendar" size="small" /> {day}
                  </p>
                  <p>
                    <b>Time:</b>
                  </p>
                  <p>
                    {' '}
                    <Icon name="time" size="small" /> {time}
                  </p>
                </Grid.Column>
                <Grid.Column floated="right" width={6}>
                  <AppointmentEmployeeCard
                    firstName={appointment?.client.firstName}
                    lastName={appointment?.client.lastName}
                    email={appointment?.client.email}
                    phone={appointment?.client.phone} // PENDING: Pass employee image to Appointment Employee Card
                    image={
                      appointment?.client.imageKey
                        ? getImageUrl(appointment?.client.imageKey)
                        : 'https://d3n8a8pro7vhmx.cloudfront.net/themes/5f3bc4644764e86d9ee8849f/attachments/original/1589382138/login.png?1589382138'
                    }
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content>
          <Modal.Actions large>
            <Button primary onClick={openConfirmation}>
              {' '}
              Cancel Appointment{' '}
            </Button>
            <Button primary onClick={handleRescheduleClick}>
              {' '}
              Reschedule{' '}
            </Button>
            <Button positive onClick={() => alert('Send reminder: TODO')}>
              {' '}
              Send Reminder{' '}
            </Button>
          </Modal.Actions>
        </Modal>
        <ApptCancelationModal
          open={showConfirm}
          onClose={closeConfirmation}
          client={appointment?.client}
          appointmentId={appointment?.id}
          when={day}
          time={time}
        />
      </React.Fragment>
    );
  } else if (role === 'BASE') {
    return (
      <React.Fragment>
        <Modal open={open} size="small" onClose={onClose} closeIcon>
          <Modal.Header>Appointment Details</Modal.Header>
          <Modal.Content>
            <Grid columns={2}>
              <Grid.Row style={{ paddingTop: '5px' }}>
                <Grid.Column style={{ paddingTop: '15px' }}>
                  <Header as="h3">
                    Appointment with {appointment?.employee.firstName}{' '}
                    {appointment?.employee.lastName}
                  </Header>
                  <p>
                    <b>When:</b>
                  </p>
                  <p>
                    {' '}
                    <Icon name="calendar" size="small" /> {day}
                  </p>
                  <p>
                    <b>Time:</b>
                  </p>
                  <p>
                    {' '}
                    <Icon name="time" size="small" /> {time}
                  </p>
                  <p>
                    <b>Where:</b>
                  </p>
                  <p>
                    {' '}
                    <Icon name="globe" size="small" /> {appointment?.employee.companyAddress}{' '}
                  </p>{' '}
                  <a 
                    target="_blank" 
                    href={"https://www.google.com/maps/dir/?api=1&origin=Weston+FL&destination=" + appointment?.employee.companyAddress + "&travelmode=driving"}
                  >
                    <Button
                      positive
                    >
                      {' '}
                      <Icon name="location arrow" size="small" /> Navigate
                    </Button>
                  </a>
                </Grid.Column>
                <Grid.Column floated="right" width={6}>
                  <AppointmentEmployeeCard
                    firstName={appointment?.employee.firstName}
                    lastName={appointment?.employee.lastName}
                    email={appointment?.employee.email}
                    phone={appointment?.employee.phone}
                    image={
                      appointment?.employee.imageKey
                        ? getImageUrl(appointment?.employee.imageKey)
                        : 'https://react.semantic-ui.com/images/avatar/large/elliot.jpg'
                    }
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content>
          <Modal.Actions large>
            <Button
              positive
              //as={Link}
              //to={'/appointment_detail'}
              onClick={handleMoreDetailsClick}
            >
              {' '}
              More Details{' '}
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
  // TBD: Role OWNER?
  return null;
}
