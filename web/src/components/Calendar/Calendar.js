import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import ViewApptModal from '../modals/ViewApptModal';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getUserAppointments } from '../../api/appointment';
import useToggle from '../../hooks/useToggle';
import moment from 'moment';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment);

export default function ApptCalendar({ user }) {
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState();
  const [appointments, setAppointments] = useState([]);
  const [loading, { on, off }] = useToggle(true);

  function handleSelectEvent(newEvent) {
    setEvent(newEvent);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setEvent(undefined);
  }

  // empty dep array so it only runs this once on initial render
  useEffect(() => {
    // fetch appointments from db
    async function handleAppointments() {
      const res = await getUserAppointments();
      const formatted_appointments = [];

      if (res && res.data) {
        const appointments = res.data;

        // they must have a specific format
        appointments?.forEach((appointment) => {
          const employee_name = `${appointment.employee.firstName} ${appointment.employee.lastName}`;
          const client_name = `${appointment.client.firstName} ${appointment.client.lastName}`;
          const start_date = new Date(Date.parse(appointment.startsAt));

          const formatted_appointment = {
            _id: appointment._id,
            title: `Appointment w/ ${
              user.role == 'BASE' ? employee_name : client_name
            }`,
            employee: employee_name,
            client: client_name,
            start: start_date,
            end: new Date(
              start_date.getTime() + appointment.duration * 60 * 1000
            ),
          };

          formatted_appointments.push(formatted_appointment);
        });
      }
      setAppointments(formatted_appointments);
      off();
    }

    if (loading) {
      handleAppointments();
    }
  }, []);

  return (
    <div id="appointment-calendar">
      <Calendar
        localizer={localizer}
        events={appointments}
        views={['week', 'month']}
        step={30}
        onSelectEvent={handleSelectEvent}
        style={{ height: 500 }}
      />
      <ViewApptModal open={open} appointment={event} onClose={handleClose} />
    </div>
  );
}
