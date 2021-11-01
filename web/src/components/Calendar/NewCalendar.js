import React, { useEffect, useRef, useState } from 'react';
import useToggle from '../../hooks/useToggle';
import okResponse from '../../utils/okResponse';
import './NewCalendar.css';
import { Button, Loader } from 'semantic-ui-react';
import { getAvailableSlots } from '../../api/appointment';
import clsx from 'clsx';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar, utils } from '@amir04lm26/react-modern-calendar-date-picker';

export default function NewCalendar({
  selected_employee,
  selectedSlot,
  onSelectSlot,
}) {
  const [loading, { on, off }] = useToggle(false);
  const [bookingDate, setBookingDate] = useState(null);
  const [bookingDay, setBookingDay] = useState(null);
  const [bookingTimes, setBookingTimes] = useState();
  const timeSlotCacheRef = useRef(new Map());

  const fetchAvailableSlots = async (dateString) => {
    const res = await getAvailableSlots(selected_employee.id, dateString);

    if (okResponse(res)) {
      return res.data.map((slot) => {
        const start = new Date(slot.start);
        const end = new Date(slot.end);
        const slotString = `${start.toLocaleTimeString()} - ${end.toLocaleTimeString()}`;

        return {
          start,
          end,
          slotString,
        };
      });
    }
  };

  const handleBookingChange = async () => {
    // Get time slots from cache
    let newBookingTimes = timeSlotCacheRef.current.get(
      bookingDate.toDateString()
    );

    // If we have no cached time slots then pick new ones
    if (!newBookingTimes) {
      on();
      const slots = await fetchAvailableSlots(bookingDate.toDateString());

      if (slots) {
        timeSlotCacheRef.current.set(bookingDate.toDateString(), slots);

        setBookingTimes(slots);
      } else {
        alert('RUH ROH');
      }
      // newBookingTimes = pickSlotTimes(times);
      // Update cache with new time slots for the selected date
      // timeSlotCacheRef.current.set(bookingDate.toDateString(), newBookingTimes);
      off();
    } else {
      setBookingTimes(newBookingTimes);
    }
  };

  useEffect(() => {
    // Bail out if there is no date selected
    if (!bookingDate) return;

    handleBookingChange();
  }, [bookingDate]);

  const handleBookingDayChange = (day) => {
    if (selected_employee && !loading) {
      onSelectSlot(null);
      setBookingDay(day);
      // I will KILL javasript for indexing at 0 for months >:(
      setBookingDate(new Date(day.year, day.month - 1, day.day));
    }
  };

  console.log();

  return (
    <div className="calendar-container">
      <div
        className="calendar-inner-container"
        title={!selected_employee && 'Select an employee to get started'}
      >
        <Loader active={loading} />
        <Calendar
          calendarClassName={clsx(
            { 'disabled-calendar': !selected_employee || loading },
            'new-calendar'
          )}
          minimumDate={utils().getToday()}
          value={bookingDay}
          onChange={handleBookingDayChange}
        />
      </div>

      {bookingTimes && (
        <div className="booking-times-container">
          <div className="booking-times">
            {bookingTimes.map((slot) => {
              return (
                <Button
                  style={{ marginBottom: '0.5rem' }}
                  size="small"
                  primary={slot.slotString === selectedSlot?.slotString}
                  key={slot.slotString}
                  onClick={(e) => onSelectSlot(slot)}
                >
                  {slot.slotString}
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
