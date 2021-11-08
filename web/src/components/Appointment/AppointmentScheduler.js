import React, { useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import AppointmentReminderSelection from './AppointmentReminderSelection';
import NewCalendar from '../Calendar/NewCalendar';
import AppointmentEmployeeCard from './AppointmentEmployeeCard';
import './AppointmentScheduler.css';
import { createUserAppointment } from '../../api/appointment';
import okResponse from '../../utils/okResponse';
import { useHistory } from 'react-router';
import useStore from '../../store/store';

export default function AppointmentScheduler({ company, employees }) {
  const history = useHistory();

  const [selectedEmployee, setSelectedEmployee] = useState();
  const [selectedSlot, setSelectedSlot] = useState();
  const [reminders, setReminders] = useState();

  const notify = useStore((state) => state.addNotification);

  const handleSelectEmployee = (_, { value }) => {
    setSelectedEmployee(value);
  };

  const handleSelectTimeSlot = (slot) => {
    setSelectedSlot(slot);
  };

  const handleCreateAppointment = async () => {
    const payload = {
      employeeEmail: selectedEmployee.email,
      startsAt: selectedSlot.start,
      wantsReminder: true,
      companyId: company.id,
    };

    const res = await createUserAppointment(payload);

    if (okResponse(res)) {
      history.push('/dashboard');
    } else {
      console.log(res);
      notify('error', 'An error occurred');
    }
  };

  return (
    <div className="appointment-scheduler-container">
      <div style={{ marginRight: '2rem' }}>
        <Dropdown
          placeholder="Select an employee"
          search
          selection
          options={employees?.map((empl) => ({
            key: empl.id,
            text: `${empl.firstName} ${empl.lastName}`,
            // FIXME: eventually. not now. Semantic UI does not like objects as values.... smh
            value: empl,
          }))}
          value={selectedEmployee}
          onChange={handleSelectEmployee}
        />

        {selectedEmployee && <AppointmentEmployeeCard {...selectedEmployee} />}
      </div>

      <NewCalendar
        selected_employee={selectedEmployee}
        selectedSlot={selectedSlot}
        onSelectSlot={handleSelectTimeSlot}
      />

      {selectedSlot && (
        <div style={{ marginLeft: '4rem' }}>
          <AppointmentReminderSelection
            selectedSlot={selectedSlot}
            reminders={reminders}
            onChange={setReminders}
            createAppointment={handleCreateAppointment}
          />
        </div>
      )}
    </div>
  );
}
