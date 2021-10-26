import React, { useEffect, useState } from 'react';
import {
  Container,
  Header,
  Grid,
  Icon,
  Segment,
  Dropdown,
} from 'semantic-ui-react';
import ApptCalendar from '../../components/Calendar/Calendar';
import KendoReactCalendar from '../../components/Calendar/NewCalendar';
import { getCompanyByName } from '../../api/company';
import { getFilledSlots } from '../../api/appointment';
import { useParams } from 'react-router';
import useToggle from '../../hooks/useToggle';
import './ScheduleAppointmentPage.css';

export default function ScheduleAppointmentPage() {
  const params = useParams();
  const [company, setCompany] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selected_employee, setEmployee] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [loading, { on, off }] = useToggle(true);

  function handleSelectedEmployee(option, employee) {
    setEmployee(employee.value);
  }

  // fetch filled slots for given employee
  async function handleFilledSlots() {
    on();

    // fetch filled slots
    const dateRange = null;
    const res = await getFilledSlots(dateRange, selected_employee.id);
    const formatted_appointments = [];

    if (res && res.data) {
      const appointments = res.data;
      console.log(appointments);

      // they must have a specific format
      [...appointments]?.forEach((appointment) => {
        const start_time = new Date(Date.parse(appointment?.startsAt));
        const end_time = new Date(Date.parse(appointment?.endsAt));

        const formatted_appointment = {
          title: 'FILLED SLOT',
          start: start_time,
          end: end_time,
        };

        formatted_appointments.push(formatted_appointment);
      });
    }

    console.log(formatted_appointments);
    setAppointments(formatted_appointments);
    off();
  }

  useEffect(() => {
    async function fetchCompany(name) {
      const res = await getCompanyByName(name);

      if (res?.status === 200 && res?.data) {
        setCompany(res.data.company);

        const options = res.data.company?.employees.map((employee) => {
          return {
            key: employee.id,
            value: { ...employee },
            text: `${employee?.firstName} ${employee?.lastName}`,
          };
        });
        setEmployees(options);
      }
    }

    if (!params.name) {
      throw new Error('TODOOO');
    } else if (!company || company.name !== params.name) {
      fetchCompany(params.name);
    }
  }, [params.name]);

  return (
    <Container style={{ marginTop: 20 }}>
      <Header as="h1" textAlign="center">
        <Icon name="list" />
        <Header.Content>{company?.name} Schedule</Header.Content>
      </Header>
      <Grid columns={2} centered>
        <Grid.Column width={12} id="calendar-column">
          <Segment className="calendar-segment">
            <KendoReactCalendar 
              selected_employee={selected_employee}
              handleAppointments={handleFilledSlots}
              appointments={appointments}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column width={4} id="segment-column">
          <h2>Select Employee</h2>
          <Dropdown
            fluid
            placeholder="Employee"
            search
            selection
            options={employees}
            onChange={handleSelectedEmployee}
          />
          <Segment>
            <h2>Employee Details</h2>
            <div>
              Name: {selected_employee?.firstName} {selected_employee?.lastName}
            </div>
            <div>Email: {selected_employee?.email}</div>
            <div>Phone Number: {selected_employee?.phone}</div>
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
}


//<ApptCalendar
//  selected_employee={selected_employee}
//  handleAppointments={handleFilledSlots}
//  appointments={appointments}
///>