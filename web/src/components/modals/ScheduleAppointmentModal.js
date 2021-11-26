import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';
import {
  Button,
  Modal,
  Grid,
  Input,
  Header,
  Icon,
  Card,
  Image,
  GridColumn,
} from 'semantic-ui-react';
import NewCalendar from '../Calendar/NewCalendar';
import AppointmentReminderSelection from '../Appointment/AppointmentReminderSelection';
import okResponse from '../../utils/okResponse';
import { createUserAppointment } from '../../api/appointment';
import ClientList from '../ClientList/ClientList';
import AppointmentEmployeeCard from '../Appointment/AppointmentEmployeeCard';

export default function ScheduleAppointmentModal(props) {
  const history = useHistory();

  const [employee, setEmployee] = useState(props.user);
  const [selectedClient, setSelectedClient] = useState();
  const [selectedSlot, setSelectedSlot] = useState();
  const [searchFilter, setSearchFilter] = useState('');
  const [searchReturn, setSearchReturn] = useState([]);

  // CLIENT SEARCH BAR
  // Filter client list
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchReturn(
        props.clients.filter((val) => {
          if (searchFilter === '') {
            return null;
          } else if (
            val.value.email.toLowerCase().includes(searchFilter.toLowerCase())
          ) {
            return val;
          }
        })
      );
    }, 700);
    return () => clearTimeout(timeoutId);
  }, [searchFilter]);

  const filteredClients = useMemo(() => {
    return props.clients.filter((val) => {
      if (val.value.email.toLowerCase().includes(searchFilter.toLowerCase())) {
        return val;
      } else {
        return null;
      }
    });
  }, [searchFilter, props.client]);

  const handleSearchBarChange = (value) => {
    setSearchFilter(value);
    setSelectedClient('');
  };

  // Trim list to only three elements
  if (searchReturn.length > 3) {
    setSearchReturn(searchReturn.slice(0, 3));
  }

  const handleListClick = (client) => {
    setSearchFilter(client.value.email);
    setSelectedClient(client);
  };

  // CALENDAR
  const handleSelectTimeSlot = (slot) => {
    setSelectedSlot(slot);
  };

  // CANCEL APPOINTMENT
  function handleCancelScheduling() {
    setSearchFilter('');
    setSelectedClient();
    setSelectedSlot();
    props.closeModal(false);
  }

  // CREATE APPOINTMENT
  const handleCreateAppointment = async () => {
    const payload = {
      employeeEmail: employee.email,
      startsAt: selectedSlot.start,
      wantsReminder: true,
      companyId: props.company.id,
    };

    const res = await createUserAppointment(payload);

    if (okResponse(res)) {
      alert('TODO: notify success');
      history.push('/dashboard');
    } else {
      console.log(res);
      alert('ruh roh!');
    }
    // Close modal after creating an appointment
    handleCancelScheduling();
  };

  console.log(selectedClient);

  return (
    <Modal
      onClose={handleCancelScheduling}
      onOpen={() => props.openModal(true)}
      open={props.isOpen}
      size="large"
      closeIcon
    >
      <Modal.Header>Schedule New Appointment</Modal.Header>
      <Modal.Content>
        <Grid columns={3} stackable>
          <Grid.Row style={{ paddingTop: '12px', height: '440px' }}>
            <Grid.Column>
              <Header as="h4">Please enter email to search for a client</Header>
              <Input
                fluid
                size="large"
                placeholder="Client email..."
                onChange={(e) => {
                  handleSearchBarChange(e.target.value);
                }}
                value={searchFilter}
              />
              <ClientList
                type="user"
                clients={searchReturn}
                click={(client) => handleListClick(client)}
                filter={searchFilter}
              />
              {selectedClient && (
                <AppointmentEmployeeCard
                  firstName={selectedClient.value.firstName}
                  lastName={selectedClient.value.lastName}
                  email={selectedClient.value.email}
                  phone={selectedClient.value.phone}
                  image={
                    'https://react.semantic-ui.com/images/avatar/large/elliot.jpg'
                  } // PENDING: Pass employee image to Appointment Employee Card
                />
              )}
            </Grid.Column>
            <Grid.Column floated="right" width={10}>
              {selectedClient && (
                <div>
                  <NewCalendar
                    selected_employee={employee}
                    selectedSlot={selectedSlot}
                    onSelectSlot={handleSelectTimeSlot}
                  />
                </div>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleCancelScheduling}> Cancel </Button>
        {selectedSlot && (
          <Button positive onClick={handleCreateAppointment}>
            {' '}
            Schedule Appointment{' '}
          </Button>
        )}
      </Modal.Actions>
    </Modal>
  );
}
