import React, { useState } from 'react';
import {
  Container,
  Header,
  Grid,
  Icon,
  Button,
  Segment,
} from 'semantic-ui-react';
import ApptCalendar from '../../components/Calendar/Calendar';
import NewCalendar from '../../components/Calendar/NewCalendar';
import { useHistory } from 'react-router';
import useToggle from '../../hooks/useToggle';
import useStore from '../../store/store';
import shallow from 'zustand/shallow';
import { getUserAppointments } from '../../api/appointment';
import './UserDashBoard.css';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  const history = useHistory();
  const [loading, { on, off }] = useToggle(true);
  const [appointments, setAppointments] = useState([]);

  function handleNewAppointment() {
    history.push('/company_search');
  }

  const { user } = useStore(
    (state) => ({
      user: state.user,
    }),
    shallow
  );

  // fetch user appointments from db
  async function handleAppointments() {
    on();

    const res = await getUserAppointments();
    const formatted_appointments = [];

    if (res && res.data) {
      const appointments = res.data;

      // they must have a specific format
      [...appointments]?.forEach((appointment) => {
        const employee_name = `${appointment.employee?.firstName} ${appointment.employee?.lastName}`;
        const client_name = `${appointment.client?.firstName} ${appointment.client?.lastName}`;
        const start_time = new Date(Date.parse(appointment.startsAt));

        const formatted_appointment = {
          _id: appointment._id,
          title: `Appointment w/ ${
            user.role == 'BASE' ? employee_name : client_name
          }`,
          employee: employee_name,
          client: client_name,
          start: start_time,
          end: new Date(
            start_time.getTime() + appointment.duration * 60 * 1000
          ),
        };

        formatted_appointments.push(formatted_appointment);
      });
    }
    setAppointments(formatted_appointments);
    off();
  }

  return (
    <Container style={{ marginTop: 20 }} fluid>
      <Header as="h1" textAlign="center">
        <Icon name="address book outline" />
        <Header.Content>User Dashboard</Header.Content>
      </Header>
      <Grid columns={2} centered style={{ height: '100%' }}>
        <Grid.Column width={12} id="calendar-column">
          <Segment className="calendar-segment" style={{ height: '100%' }}>
            <ApptCalendar
                selected_employee={null}
                handleAppointments={handleAppointments}
                appointments={appointments}
              /> 
            <Button
              onClick={handleNewAppointment}
              icon
              basic
              size="big"
              color="black"
              style={{ marginTop: 10 }}
              floated="right"
              as={Link}
              to="/company_search"
            >
              <Icon name="calendar plus" />
            </Button>
          </Segment>
        </Grid.Column>
        <Grid.Column stretched width={4} id="segment-column">
          <Segment className="reminders-segment">
            <Header as="h3">Scheduled Reminders</Header>
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
}