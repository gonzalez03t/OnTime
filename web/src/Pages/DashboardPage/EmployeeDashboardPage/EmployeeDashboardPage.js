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
import useStore from '../../../store/store';
import shallow from 'zustand/shallow';
import ClientList from '../../../components/ClientList/ClientList';
import { getCompanyByName } from '../../../api/company';
import './EmployeeDashboardPage.css';
import ClientProfileModal from '../../../components/modals/ClientProfileModal';
import ScheduleAppointmentModal from '../../../components/modals/ScheduleAppointmentModal';

export default function EmployeeDashboardPage() {
  const { user, appointments, fetchAppointments } = useStore(
    (state) => state,
    shallow
  );

  const [clients, setClients] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState({});
  const [selectedClient, setSelectedClient] = useState({});

  const [company, setCompany] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openScheduleApptModal, setOpenScheduleApptModal] = useState(false);

  const [formattedAppointments, setFormattedAppointments] = useState([]);

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

  function handleRescheduleClick() {
    setOpenModal(false);
    setOpenScheduleApptModal(true);
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

  function handleNewAppointment() {
    setOpenScheduleApptModal(true);
  }

  // fetch user appointments from db
  async function handleAppointments() {
    const formatted = [];
    const options = [];
    const client_map = new Map();

    if (appointments) {
      // they must have a specific format
      appointments.forEach((appointment) => {
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

        console.log(appointment);

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
        formatted.push(formatted_appointment);
      });
    }

    options.sort((a, b) => (a.startsAt > b.startsAt ? 1 : -1));
    setFormattedAppointments(formatted);
    setClients(options);
    setSearchReturn(clients);
  }

  useEffect(() => {
    async function init() {
      await fetchAppointments();
    }

    if (!appointments) {
      init().then(() => handleAppointments());
    } else {
      handleAppointments();
    }
  }, [appointments]);

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
        prevAppointment={selectedAppointment}
        isOpen={openScheduleApptModal}
        clients={clients}
        user={user}
        selectedClient={selectedClient}
        company={company}
        openModal={(val) => setOpenScheduleApptModal(val)}
        closeModal={handleRescheduleClose}
      />
    </Container>
  );
}
