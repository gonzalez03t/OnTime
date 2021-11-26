import React, { useState, useEffect, useMemo } from 'react';
import { Image, List, Input, Button, Icon, Form } from 'semantic-ui-react';
import EmployeeCard from './EmployeeCard';
import companyImage from '../../assets/company_placeholder.JPG';
import { inviteEmployee } from '../../api/company';
import './EmployeeList.css';

export default function EmployeeList({ company }) {
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [searchFilter, setSearchFilter] = useState('');
  const [openInvite, setOpenInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState();

  function handleSelectedemployee(employee) {
    setOpenInvite(false);
    setSelectedEmployee(employee);
  }

  function handleNewEmployee() {
    setSelectedEmployee(null);
    setOpenInvite(true);
  }

  function handleEmail(value) {
    setInviteEmail(value);
  }

  function handleInvite(e) {
    e.preventDefault();
    const res = inviteEmployee(inviteEmail);
    setInviteEmail(null);
    setOpenInvite(false);
  }

  function handleEmployeeSearch(value) {
    setSearchFilter(value);
  }

  const filteredEmployees = useMemo(() => {
    return company?.employees.filter((val) => {
      if (
        JSON.stringify(Object.values(val)).includes(searchFilter.toLowerCase())
      ) {
        return val;
      } else {
        return null;
      }
    });
  }, [searchFilter, company?.employees]);

  return (
    <div className="employee-list-container">
      <div
        style={{ marginLeft: '1.5rem', width: '15rem', marginBottom: '1rem' }}
      >
        <Input
          action={
            <Button onClick={handleNewEmployee} icon positive>
              <Icon name="plus" />
            </Button>
          }
          actionPosition="right"
          fluid
          placeholder="Employee Name"
          onChange={(e) => {
            handleEmployeeSearch(e.target.value);
          }}
        />
        <List
          selection
          verticalAlign="middle"
          style={{ maxHeight: '25rem', overflow: 'auto' }}
        >
          {filteredEmployees?.map((employee) => (
            <List.Item
              key={employee.id}
              onClick={() => handleSelectedemployee(employee)}
            >
              <Image avatar src={employee.image || companyImage} />
              <List.Content>
                <List.Header as="a">
                  {' '}
                  {employee.firstName} {employee.lastName}{' '}
                </List.Header>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </div>
      {selectedEmployee && <EmployeeCard employee={selectedEmployee} />}
      {openInvite && (
        <div style={{ marginLeft: '10rem' }}>
          <h3>Employee Invitation</h3>
          <Form onSubmit={handleInvite}>
            <Form.Field>
              <label>Email</label>
              <Input
                placeholder="mickey.mouse@gmail.com"
                onChange={(e) => {
                  handleEmail(e.target.value);
                }}
              />
            </Form.Field>
            <Button color="blue" type="submit" floated="right">
              Send Invite
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
}
