import React, { useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import AppointmentReminderSelection from './AppointmentReminderSelection';
import NewCalendar from '../Calendar/NewCalendar';
import AppointmentEmployeeCard from './AppointmentEmployeeCard';
import './AppointmentScheduler.css';
import { createUserAppointment } from '../../api/appointment';
import okResponse from '../../utils/okResponse';
import { useHistory } from 'react-router';

export default function AppointmentScheduler({ company, employees }) {
  const history = useHistory();

  const [selectedEmployee, setSelectedEmployee] = useState();
  const [selectedSlot, setSelectedSlot] = useState();
  const [reminders, setReminders] = useState();

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

    // alert(JSON.stringify(payload, null, 2));

    const res = await createUserAppointment(payload);

    if (okResponse(res)) {
      alert('TODO: notify success');
      history.push('/dashboard');
    } else {
      console.log(res);
      alert('ruh roh!');
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
