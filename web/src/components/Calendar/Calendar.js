import React, { useEffect, useState, Children } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import ViewApptModal from '../modals/ViewApptModal';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import useAutoSizer from '../../hooks/useAutoSizer';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment);

export default function ApptCalendar({
  onSelect,
  onRescheduleClick,
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
  const selectable = !selected_employee ? true : false;
  const CURRENT_DATE = moment().subtract(1, 'days').toDate();

  // styling for past days
  const ColoredDateCellWrapper = ({ children, value }) =>
    React.cloneElement(Children.only(children), {
      style: {
        ...children.style,
        background: value <= CURRENT_DATE ? '#e6e6e6' : children.style,
      },
    });

  function handleSelectEvent(newEvent) {
    onSelect && onSelect(newEvent);
    setEvent(newEvent);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setEvent(undefined);
  }

  useEffect(() => {
    handleAppointments();
  }, [selected_employee]);

  return (
    <React.Fragment>
      <Calendar
        selectable={selectable}
        popup
        localizer={localizer}
        events={appointments}
        views={views}
        defaultView={defaultView}
        step={30}
        onSelectEvent={handleSelectEvent}
        style={{ height }}
        components={{
          dateCellWrapper: ColoredDateCellWrapper,
        }}
      />
      <ViewApptModal
        open={open}
        appointment={event}
        onClose={handleClose}
        onRescheduleClick={onRescheduleClick}
      />
    </React.Fragment>
  );
}
