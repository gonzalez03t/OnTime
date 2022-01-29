import React, { useCallback, useEffect } from 'react';
import { Button } from 'semantic-ui-react';

export default function AppointmentReminderSelection({
  selectedSlot,
  reminders,
  onChange,
  createAppointment,
}) {
  const getDefaultReminder = useCallback(() => {
    if (selectedSlot) {
      let defaultReminder = new Date(selectedSlot.start);
      defaultReminder.setHours(
        defaultReminder.getHours() - 1,
        defaultReminder.getMinutes(),
        0,
        0
      );

      return defaultReminder;
    }

    return null;
  }, [selectedSlot]);

  useEffect(() => {
    if (selectedSlot) {
      onChange([getDefaultReminder()]);
    }
  }, [selectedSlot]);

  if (selectedSlot && reminders) {
    return (
      <div>
        <div>
          Default reminder: {reminders[0].toLocaleTimeString()}
          {reminders.length > 1 && (
            <div>
              Additional reminders:{' '}
              {reminders
                .slice(1)
                .map((reminder) => reminder.toLocaleTimeString())
                .join(', ')}
            </div>
          )}
        </div>

        <Button positive onClick={createAppointment}>
          Schedule Appointment
        </Button>
      </div>
    );
  } else {
    return null;
  }
}
