import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Button, Modal, Grid, Header } from 'semantic-ui-react';
import NewCalendar from '../Calendar/NewCalendar';
import okResponse from '../../utils/okResponse';
import { rescheduleAppointment } from '../../api/appointment';
import AppointmentEmployeeCard from '../Appointment/AppointmentEmployeeCard';
import useStore from '../../store/store';
import shallow from 'zustand/shallow';
import { getImageUrl } from '../../api/image';

export default function RescheduleAppointmentModal(props) {
  const history = useHistory();

  const { user, fetchAppointments } = useStore((state) => state, shallow);
  const notify = useStore((state) => state.addNotification);

  const [selectedSlot, setSelectedSlot] = useState();

  // CALENDAR
  const handleSelectTimeSlot = (slot) => {
    setSelectedSlot(slot);
  };

  // CANCEL RESCHEDULING
  function handleCancelRescheduling() {
    setSelectedSlot();
    props.closeModal(false);
  }

  // RESCHEDULE APPOINTMENT
  const handleReschedule = async () => {
    const payload = {
      newDateTime: selectedSlot.start,
      appointmentId: props.appointment.id,
      clientId:
        user.role === 'EMPLOYEE' ? props.appointment.client.id : undefined,
    };

    const res = await rescheduleAppointment(
      payload.appointmentId,
      payload.newDateTime,
      payload.clientId
    );

    if (okResponse(res)) {
      notify('success', 'Appointment rescheduled');
      await fetchAppointments();
      handleCancelRescheduling();
      history.push('/dashboard');
    } else {
      console.log(res);
      notify('error', 'Failed to reschedule appointment');
    }
  };

  return (
    <Modal
      onClose={handleCancelRescheduling}
      onOpen={() => props.openModal(true)}
      open={props.isOpen}
      size="large"
      closeIcon
    >
      <Modal.Header>Reschedule Appointment</Modal.Header>
      <Modal.Content>
        <Grid columns={3} stackable>
          <Grid.Row style={{ paddingTop: '12px', height: '440px' }}>
            <Grid.Column>
              <Header as="h3" style={{ padding: '20px' }}>
                Employee information:
              </Header>
              <AppointmentEmployeeCard
                firstName={props.appointment?.employee.firstName}
                lastName={props.appointment?.employee.lastName}
                email={props.appointment?.employee.email}
                phone={props.appointment?.employee.phone}
                image={
                  props.appointment?.employee.imageKey
                    ? getImageUrl(props.appointment?.employee.imageKey)
                    : '/User1.PNG'
                }
                size={'large'}
              />
            </Grid.Column>
            <Grid.Column floated="right" width={10}>
              <div>
                <NewCalendar
                  selected_employee={props.appointment?.employee}
                  selectedSlot={selectedSlot}
                  onSelectSlot={handleSelectTimeSlot}
                />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleCancelRescheduling}> Cancel </Button>
        {selectedSlot && (
          <Button positive onClick={handleReschedule}>
            {' '}
            Schedule Appointment{' '}
          </Button>
        )}
      </Modal.Actions>
    </Modal>
  );
}
