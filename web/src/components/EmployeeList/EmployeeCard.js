import React, { useState } from 'react';
import { Grid, Card, Image, Icon, Button } from 'semantic-ui-react';
import { removeEmployee } from '../../api/company';
import useStore from '../../store/store';
import { useHistory } from 'react-router';
import useToggle from '../../hooks/useToggle';
import RemoveEmployeeModal from '../modals/RemoveEmployeeModal';

export default function EmployeeCard({ employee }) {
  const history = useHistory();
  const notify = useStore((state) => state.addNotification);
  const [loading, { on, off }] = useToggle(false);
  const [open, setOpen] = useState(false);

  async function handleRemove() {
    on();
    const res = await removeEmployee(employee.id);
    if (res && res.status === 201) {
      off();
      notify('info', 'Employee Removed');
      history.push('/');
    } else {
      notify('error', 'Error');
    }
    off();
  }

  function handleModal() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Grid columns={2} stackable>
      <Grid.Column floated="right" width={4} id="avatar-column">
        <Card>
          <Image
            src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
            size="medium"
          />
        </Card>
      </Grid.Column>
      <Grid.Column style={{ paddingLeft: '0px' }}>
        <Grid columns={2} stackable>
          <Grid.Row style={{ paddingBottom: '6px' }}>
            <Grid.Column floated="left" width={8}>
              <p style={{ marginBottom: '6px' }}>
                {' '}
                <Icon name="user" size="small" /> First Name:
              </p>
              <p>
                <b>{employee?.firstName}</b>
              </p>
            </Grid.Column>
            <Grid.Column floated="left" width={8}>
              <p style={{ marginBottom: '6px' }}>
                {' '}
                <Icon name="user" size="small" /> Last Name:
              </p>
              <p>
                <b>{employee?.lastName}</b>
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ paddingBottom: '6px' }}>
            <Grid.Column floated="left" width={8}>
              <p style={{ marginBottom: '6px' }}>
                {' '}
                <Icon name="calendar" size="small" /> Date of Birth:
              </p>
              <p>
                <b>{employee?.dob.toString().slice(0, 10)}</b>
              </p>
            </Grid.Column>
            <Grid.Column floated="left" width={8}>
              <p style={{ marginBottom: '6px' }}>
                {' '}
                <Icon name="phone" size="small" /> Phone Number:
              </p>
              <p>
                <a href={`tel:${employee?.phone}`}>{employee?.phone}</a>
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ paddingBottom: '6px' }}>
            <Grid.Column floated="left" width={8}>
              <p style={{ marginBottom: '6px' }}>
                {' '}
                <Icon name="mail" size="small" /> Email:
              </p>
              <p>
                <a href={`mailto:${employee?.email}`}>{employee?.email}</a>
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ paddingBottom: '6px' }}>
            <Grid.Column floated="right" width={8}>
              <RemoveEmployeeModal
                open={open}
                onClose={handleClose}
                handleRemove={handleRemove}
                loading={loading}
                employee={employee}
              />
              <Button negative onClick={handleModal}>
                Remove
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Grid.Column>
    </Grid>
  );
}
