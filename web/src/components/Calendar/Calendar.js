import { Calendar,  momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React from 'react';
import moment from 'moment'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment)

// example list
const myEventsList = [
    {
        id: 0,
        title: 'Dev Meeting',
        start: new Date(2021, 8, 14, 11),
        end: new Date(2021, 8, 14, 12),
    },
    {
        id: 1,
        title: 'Advisor Meeting',
        start: new Date(2021, 8, 14, 18),
        end: new Date(2021, 8, 14, 19),
    },
]

const ApptCalendar = props => (
    <div id="appointment-calendar">
      <Calendar
        localizer={localizer}
        events={myEventsList}
        views={["week", "month"]}
        step={30}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
)

export default ApptCalendar;