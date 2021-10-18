import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import ViewApptModal from '../modals/ViewApptModal';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { getUserAppointments } from '../../api/appointment';
import useToggle from '../../hooks/useToggle';
import useAutoSizer from '../../hooks/useAutoSizer';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment);

export default function ApptCalendar({
  selected_employee,
  handleAppointments,
  appointments,
}) {
  const { height } = useAutoSizer({ height: 0.65 });
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState();

  // calendar settings
  const views = !selected_employee ? ['week', 'month'] : ['week'];
  const defaultView = !selected_employee ? Views.MONTH : Views.WEEK;

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
    handleAppointments();
  }, [selected_employee]);

  return (
    <React.Fragment>
      <Calendar
        localizer={localizer}
        events={appointments}
        views={views}
        defaultView={defaultView}
        step={30}
        onSelectEvent={handleSelectEvent}
        style={{ height }}
      />
      <ViewApptModal open={open} appointment={event} onClose={handleClose} />
    </React.Fragment>
  );
}
