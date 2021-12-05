import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';
import { Button, Modal, Grid, Input, Header } from 'semantic-ui-react';
import NewCalendar from '../Calendar/NewCalendar';
import okResponse from '../../utils/okResponse';
import {
  createUserAppointment,
  rescheduleAppointment,
} from '../../api/appointment';
import ClientList from '../ClientList/ClientList';
import AppointmentEmployeeCard from '../Appointment/AppointmentEmployeeCard';
import useStore from '../../store/store';
import shallow from 'zustand/shallow';
import { getImageUrl } from '../../api/image';

function objIsEmpty(obj) {
  if (!obj) return true;

  return Object.keys(obj).length === 0;
}

export default function ScheduleAppointmentModal(props) {
  const history = useHistory();

  const { user, fetchAppointments } = useStore((state) => state, shallow);
  const notify = useStore((state) => state.addNotification);

  const [employee, setEmployee] = useState(props.user);
  const [selectedClient, setSelectedClient] = useState();
  const [selectedSlot, setSelectedSlot] = useState();
  const [searchFilter, setSearchFilter] = useState('');
  const [searchReturn, setSearchReturn] = useState([]);

  useEffect(() => {
    if (props.selectedClient && Object.keys(props.selectedClient).length > 0) {
      setSearchFilter(props.selectedClient.email);
    }
  }, [props.selectedClient]);

  const filteredClients = useMemo(() => {
    return props.clients.filter((val) => {
      if (
        val?.value.email?.toLowerCase().includes(searchFilter?.toLowerCase())
      ) {
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

  // RESCHEDULE APPOINTMENT
  const handleReschedule = async () => {
    const payload = {
      newDateTime: selectedSlot.start,
      appointmentId: props.prevAppointment.id,
      clientId:
        user.role === 'EMPLOYEE' ? props.prevAppointment.client.id : undefined,
    };

    const res = await rescheduleAppointment(
      payload.appointmentId,
      payload.newDateTime,
      payload.clientId
    );

    if (okResponse(res)) {
      notify('success', 'Appointment rescheduled');
      await fetchAppointments();
      handleCancelScheduling();
      history.push('/dashboard');
    } else {
      console.log(res);
      notify('error', 'Failed to reschedule appointment');
    }
  };

  // CREATE APPOINTMENT
  const handleCreateAppointment = async () => {
    const payload = {
      employeeEmail: employee.email,
      startsAt: selectedSlot.start,
      wantsReminder: true,
      companyId: props.company.id,
      clientId: selectedClient.value.id,
    };

    const res = await createUserAppointment(payload);

    if (okResponse(res)) {
      notify('success', 'Appointment created');
      await fetchAppointments();
      handleCancelScheduling();
      history.push('/dashboard');
    } else {
      console.log(res);
      notify('error', 'Failed to create appointment');
    }

    // Close modal after creating an appointment
    handleCancelScheduling();
  };

  const handleSubmit = () => {
    if (!objIsEmpty(props.prevAppointment)) {
      handleReschedule();
    } else {
      handleCreateAppointment();
    }
  };

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
                clients={filteredClients}
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
                    selectedClient?.value?.imageKey
                      ? getImageUrl(selectedClient?.value?.imageKey)
                      : "/User1.PNG"
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
          <Button positive onClick={handleSubmit}>
            {' '}
            Schedule Appointment{' '}
          </Button>
        )}
      </Modal.Actions>
    </Modal>
  );
}
