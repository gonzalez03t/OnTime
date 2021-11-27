import React, { useState, useEffect } from 'react';
import {
  Container,
  Header,
  Grid,
  Icon,
  Button,
  Segment,
  Input,
} from 'semantic-ui-react';
import ApptCalendar from '../../../components/Calendar/Calendar';
import { useHistory } from 'react-router';
import useToggle from '../../../hooks/useToggle';
import useStore from '../../../store/store';
import shallow from 'zustand/shallow';
import ClientList from '../../../components/ClientList/ClientList';
import { getUserAppointments } from '../../../api/appointment';
import { getCompanyByName } from '../../../api/company';
import './EmployeeDashboardPage.css';
import { Link } from 'react-router-dom';
import ClientProfileModal from '../../../components/modals/ClientProfileModal';
import ScheduleAppointmentModal from '../../../components/modals/ScheduleAppointmentModal';

export default function EmployeeDashboardPage() {
  const { user, getFullname } = useStore(
    (state) => ({
      user: state.user,
      getFullname: state.getFullname,
    }),
    shallow
  );

  const history = useHistory();
  const [loading, { on, off }] = useToggle(true);
  const [appointments, setAppointments] = useState([]);
  const [clients, setClients] = useState([]);
  const [selected_client, setClient] = useState(true);
  const [company, setCompany] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openScheduleApptModal, setOpenScheduleApptModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState({});

  useEffect(() => {
    async function fetchCompany(name) {
      const res = await getCompanyByName(name);
      console.log(res);
      if (res?.status === 200 && res?.data) {
        setCompany(res.data.company);
      }
    }

    if (!company) {
      fetchCompany(user.company);
    }
  }, []);
  const [searchFilter, setSearchFilter] = useState('');
  const [searchReturn, setSearchReturn] = useState([]);

  function handleSelectedClient(client) {
    //TODO
    //setClient(client.value);
  }

  // Handle client click
  const handleClick = (client) => {
    setOpenModal(true);
    setSelectedClient(client);
  };
  function handleClientSearch(value) {
    setSearchFilter(value);
  }

  function handleNewAppointment() {
    console.log('Creating new Appt.');
    setOpenScheduleApptModal(true);
    //setSelectedClient(client);
  }

  // fetch user appointments from db
  async function handleAppointments() {
    on();

    const res = await getUserAppointments();
    const formatted_appointments = [];
    const options = [];
    const client_map = new Map();

    if (res && res.data) {
      const appointments = res.data;

      // they must have a specific format
      [...appointments]?.forEach((appointment) => {
        const curr_client = appointment.client;
        const clientId = appointment.client?.id;
        const start_time = new Date(Date.parse(appointment.startsAt));

        // list clients with no repetitions and add to dropdown options
        if (!client_map.has(clientId)) {
          client_map.set(clientId, curr_client);
          options.push({
            key: clientId,
            value: { ...curr_client },
            text: `${curr_client?.firstName} ${curr_client?.lastName}`,
            start: start_time,
          });
        }

        const client_name = `${appointment.client?.firstName} ${appointment.client?.lastName}`;

        const formatted_appointment = {
          id: appointment.id,
          title: `Appointment w/ ${client_name}`,
          employee: user,
          client: appointment.client,
          start: start_time,
          end: new Date(
            start_time.getTime() + appointment.duration * 60 * 1000
          ),
        };
        formatted_appointments.push(formatted_appointment);
      });
    }

    options.sort((a, b) => (a.startsAt > b.startsAt ? 1 : -1));
    setClients(options);
    setSearchReturn(clients);
    setAppointments(formatted_appointments);
    off();
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchReturn(
        clients.filter((val) => {
          if (searchFilter === '') {
            return val;
          } else if (
            val.text.toLowerCase().includes(searchFilter.toLowerCase())
          ) {
            return val;
          }
        })
      );
    }, 700);
    return () => clearTimeout(timeoutId);
  }, [searchFilter]);

  return (
    <Container style={{ marginTop: 20 }} fluid>
      <Header as="h1" textAlign="center">
        <Icon name="address book outline" />
        <Header.Content>Dashboard</Header.Content>
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
            >
              <Icon name="calendar plus" />
            </Button>
          </Segment>
        </Grid.Column>
        <Grid.Column width={4} id="segment-column">
          <h3>Client Search</h3>
          <Input
            fluid
            placeholder="Client Name"
            onChange={(e) => {
              handleClientSearch(e.target.value);
            }}
          />
          <Segment>
            <h2>Client List</h2>
            <ClientList
              //clients={clients}
              click={(client) => handleClick(client)}
              clients={searchReturn}
              handleSelectedClient={handleSelectedClient}
            />
          </Segment>
        </Grid.Column>
      </Grid>

      <ClientProfileModal
        isOpen={openModal}
        client={selectedClient}
        openModal={(val) => setOpenModal(val)}
        closeModal={(val) => setOpenModal(val)}
      />

      <ScheduleAppointmentModal
        isOpen={openScheduleApptModal}
        clients={clients}
        user={user}
        company={company}
        openModal={(val) => setOpenScheduleApptModal(val)}
        closeModal={(val) => setOpenScheduleApptModal(val)}
      />
    </Container>
  );
}
