import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import AppointmentEmployeeCard from '../../components/Appointment/AppointmentEmployeeCard';
import { Link } from 'react-router-dom';
import ApptCancelationWarning from '../../components/modals/ApptCancelationWarning';
import RescheduleAppointmentModal from '../../components/modals/RescheduleAppointmentModals';

import {
  Container,
  Segment,
  Button,
  Modal,
  Header,
  Grid,
  Icon,
  Image,
  Divider,
} from 'semantic-ui-react';
import GoogleMaps from '../../components/MapComponent/GoogleMaps';

export default function PatientAppointment() {
  const [cancelationWarning, setCancelationWarning] = useState(false);
  const [openRescheduleApptModal, setOpenRescheduleApptModal] = useState(false);
  const { state } = useLocation();
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    if (state?.appointment) {
      setAppointment(state.appointment);
    }
  }, [state]);

  console.log(appointment);

  let day = `${appointment?.start.toString().slice(0, 3)}, ${appointment?.start
    .toString()
    .slice(4, 15)}`;
  let time = `${appointment?.start
    .toString()
    .slice(16, 24)} ${appointment?.start.toString().slice(34, 57)}`;

  function handleCancelationWarningClose() {
    setCancelationWarning(false);
  }

  function handleRescheduleClose() {
    setOpenRescheduleApptModal(false);
    //setSelectedAppointment({});
    //setSelectedClient({});
  }

  return (
    <Container style={{ marginTop: 100 }}>
      <Segment style={{ padding: '15px' }}>
        <Grid columns={2} divided stackable>
          <Grid.Row>
            <Grid.Column>
              <Header as="h3" style={{ paddingTop: '15px' }}>
                Hi {appointment?.client.firstName}, You have an appointment with{' '}
                {appointment?.employee.firstName}{' '}
                {appointment?.employee.lastName}.
              </Header>
              <Divider style={{ paddingBottom: '10px' }} />
              <div style={{ height: '500px', paddingLeft: '10px' }}>
                <p>
                  <b>When:</b>
                </p>
                <p>
                  {' '}
                  <Icon name="calendar" size="large" color="blue" /> {day}
                </p>
                <p>
                  <b>Time:</b>
                </p>
                <p>
                  {' '}
                  <Icon name="time" size="large" color="blue" /> {time}
                </p>
                <p>
                  <b>Where:</b>
                </p>
                <p style={{ paddingBottom: '20px' }}>
                  {' '}
                  <Icon name="globe" size="large" color="blue" />{' '}
                  {appointment?.employee.companyAddress}{' '}
                </p>{' '}
                <AppointmentEmployeeCard
                  size="large"
                  firstName={appointment?.employee.firstName}
                  lastName={appointment?.employee.lastName}
                  email={appointment?.employee.email}
                  phone={appointment?.employee.phone}
                  image={
                    'https://react.semantic-ui.com/images/avatar/large/elliot.jpg'
                  } // PENDING: Pass employee image to Appointment Employee Card
                />
              </div>

              <Divider />
              <Grid columns={2} stackable>
                <Grid.Row>
                  <Grid.Column width={11}>
                    <p style={{ marginBottom: '5px' }}>
                      <b>
                        {appointment?.client.firstName}{' '}
                        {appointment?.client.lastName}
                      </b>
                    </p>
                    <p style={{ marginBottom: '2px' }}>
                      <a href={`tel:${appointment?.client.phone}`}>
                        {appointment?.client.phone}
                      </a>
                    </p>
                    <p>
                      <a href={`mailto:${appointment?.client.email}`}>
                        {appointment?.client.email}
                      </a>
                    </p>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Button
                      style={{ marginTop: '20px' }}
                      as={Link}
                      to="/settings"
                      floated="center"
                    >
                      {' '}
                      <Icon name="user" size="small" />
                      My Account{' '}
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>

            <Grid.Column>
              <Header as="h3" style={{ paddingTop: '15px' }}>
                Directions.
              </Header>
              <Divider style={{ paddingBottom: '10px' }} />

              <GoogleMaps
                fullAddress={
                  appointment
                    ? appointment?.employee.companyAddress
                    : 'University of Florida'
                }
              />
              <Divider />

              <Grid columns={2} stackable>
                <Grid.Row>
                  <Grid.Column width={11}>
                    <p style={{ marginBottom: '5px' }}>
                      <b>Click Navigate to go to your appointment.</b>
                    </p>
                    {appointment
                      ? appointment?.employee.companyAddress
                      : 'University of Florida'}
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Button
                      style={{ marginTop: '20px' }}
                      positive
                      floated="right"
                      onClick={() => alert('Navigation Page: TODO')}
                    >
                      {' '}
                      <Icon name="location arrow" size="small" /> Navigate
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment clearing>
        <Button
          size="large"
          style={{ margin: '5px' }}
          primary
          floated="right"
          onClick={() => setOpenRescheduleApptModal(true)}
        >
          <Icon name="calendar check" size="small" />
          Reschedule{' '}
        </Button>
        <Button
          size="large"
          style={{ margin: '5px' }}
          primary
          floated="right"
          onClick={() => setCancelationWarning(true)}
        >
          <Icon name="cancel" size="small" />
          Cancel Appointment{' '}
        </Button>
      </Segment>
      <ApptCancelationWarning
        open={cancelationWarning}
        onClose={handleCancelationWarningClose}
        onCloseParent={() => {}}
        appointmentID={appointment?.id}
        personFirstName={appointment?.employee.firstName}
        personLastName={appointment?.employee.lastName}
        when={day}
        time={time}
      />
      <RescheduleAppointmentModal
        isOpen={openRescheduleApptModal}
        appointment={appointment}
        closeModal={handleRescheduleClose}
      />
    </Container>
  );
}
