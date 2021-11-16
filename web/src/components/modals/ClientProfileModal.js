import React from 'react';
import { Button, Modal, Grid, Icon, Card, Image } from 'semantic-ui-react';

export default function ClientApptModal(props) {
  if (props.client.value) {
    return (
      <Modal
        onClose={() => props.closeModal(false)}
        onOpen={() => props.openModal(true)}
        open={props.isOpen}
        size="small"
        closeIcon
      >
        <Modal.Header>Client Details</Modal.Header>
        <Modal.Content>
          <Grid columns={2} stackable>
            <Grid.Row style={{ paddingTop: '12px' }}>
              <Grid.Column floated="left" width={8}>
                <Card>
                  <Image
                    src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
                    wrapped
                    ui={false}
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
                        <b>{props.client.value?.firstName}</b>
                      </p>
                    </Grid.Column>
                    <Grid.Column floated="left" width={8}>
                      <p style={{ marginBottom: '6px' }}>
                        {' '}
                        <Icon name="user" size="small" /> Last Name:
                      </p>
                      <p>
                        <b>{props.client.value?.lastName}</b>
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
                        <b>{props.client.value?.dob.toString().slice(0, 10)}</b>
                      </p>
                    </Grid.Column>
                    <Grid.Column floated="left" width={8}>
                      <p style={{ marginBottom: '6px' }}>
                        {' '}
                        <Icon name="phone" size="small" /> Phone Number:
                      </p>
                      <p>
                        <a href={`tel:${props.client?.value.phone}`}>
                          {props.client?.value.phone}
                        </a>
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
                        <a href={`mailto:${props.client.value?.email}`}>
                          {props.client.value?.email}
                        </a>
                      </p>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row style={{ paddingBottom: '6px' }}>
                    <Grid.Column floated="left" width={8}>
                      <p style={{ marginBottom: '6px' }}>
                        {' '}
                        <Icon name="id badge" size="small" /> Client ID:
                      </p>
                      <p>
                        <b>{props.client.value?.id}</b>
                      </p>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button positive onClick={() => alert('Send reminder: TODO')}>
            {' '}
            Send Reminder{' '}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  } else {
    return null;
  }
}
