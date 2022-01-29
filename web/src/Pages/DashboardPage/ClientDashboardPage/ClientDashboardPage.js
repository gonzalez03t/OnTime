import React, { useEffect, useMemo, useState } from 'react';
import {
  Container,
  Header,
  Grid,
  Icon,
  Button,
  Segment,
  Image,
} from 'semantic-ui-react';
import ApptCalendar from '../../../components/Calendar/Calendar';
import { useHistory } from 'react-router';
import useToggle from '../../../hooks/useToggle';
import useStore from '../../../store/store';
import shallow from 'zustand/shallow';
import './ClientDashboardPage.css';
import { Link } from 'react-router-dom';
import ScheduleAppointmentModal from '../../../components/modals/ScheduleAppointmentModal';

export default function ClientDashboardPage() {
  const history = useHistory();
  // TODO: use this
  const [loading, { on, off }] = useToggle(true);

  function handleNewAppointment() {
    history.push('/company_search');
  }

  const { appointments, fetchAppointments, user } = useStore(
    (state) => state,
    shallow
  );

  // TODO: use these
  const [openModal, setOpenModal] = useState(false);
  const [openScheduleApptModal, setOpenScheduleApptModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState({});
  const [selectedClient, setSelectedClient] = useState({});

  function handleRescheduleClick() {
    setOpenModal(false);
    // setOpenScheduleApptModal(true);
    alert('TODO');
  }

  function handleRescheduleClose() {
    setOpenScheduleApptModal(false);
    setSelectedAppointment({});
    setSelectedClient({});
  }

  function handleAppointmentClick(appointment) {
    if (appointment === null) {
      setSelectedAppointment({});
      setSelectedClient({});
    } else {
      setSelectedAppointment(appointment);
      setSelectedClient(appointment?.client ?? {});
    }
  }

  useEffect(() => {
    if (appointments === null) {
      on();
      fetchAppointments();
      off();
    }
  }, [appointments]);

  const formattedAppointments = useMemo(() => {
    if (!appointments) {
      return [];
    }

    return appointments.map((appointment) => {
      const employee_name = `${appointment.employee?.firstName} ${appointment.employee?.lastName}`;
      const start_time = new Date(Date.parse(appointment.startsAt));

      return {
        id: appointment.id,
        title: `${employee_name}`,
        employee: appointment.employee,
        client: user,
        start: start_time,
        end: new Date(start_time.getTime() + appointment.duration * 60 * 1000),
      };
    });
  }, [appointments]);

  return (
    <Container style={{ marginTop: 20 }} fluid>
      <Header as="h1" textAlign="left">
        <Image src="/User1.PNG" size="big" />
        <Header.Content>Dashboard</Header.Content>
      </Header>
      <Grid columns={2} centered style={{ height: '100%' }}>
        <Grid.Column width={12} id="calendar-column">
          <Segment className="calendar-segment" style={{ height: '100%' }}>
            <ApptCalendar
              onSelect={handleAppointmentClick}
              onRescheduleClick={handleRescheduleClick}
              selected_employee={null}
              handleAppointments={fetchAppointments}
              appointments={formattedAppointments}
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

      {/* 
      // TODO: reschedule for client modal goes here
      <ScheduleAppointmentModal
        prevAppointment={selectedAppointment}
        isOpen={openScheduleApptModal}
        clients={clients}
        user={user}
        selectedClient={selectedClient}
        company={company}
        openModal={(val) => setOpenScheduleApptModal(val)}
        closeModal={handleRescheduleClose}
      /> */}
    </Container>
  );
}
