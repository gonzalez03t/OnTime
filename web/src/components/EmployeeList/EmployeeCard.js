import React from 'react';
import { Grid, Card, Image, Icon, Button } from 'semantic-ui-react';

export default function EmployeeCard({ employee }) {
  function removeEmployee() {
    alert('TODO');
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
              <Button negative onClick={removeEmployee}>
                Remove
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Grid.Column>
    </Grid>
  );
}
