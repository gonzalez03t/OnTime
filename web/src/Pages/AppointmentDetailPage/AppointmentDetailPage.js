import React, { useState } from 'react';
import {
  Container,
  Segment,
  Button,
  Modal,
  Header,
  Grid,
  Icon,
  Image,
} from 'semantic-ui-react';
import GoogleMaps from '../../components/MapComponent/GoogleMaps';

export default function PatientAppointment() {
  const [cancelationWarning, setCancelationWarning] = useState(false);

  return (
    <Container style={{ marginTop: 100 }}>
      <Grid columns={2} divided stackable>
        <Grid.Row>
          <Grid.Column>
            <Segment style={{ height: '647px' }}>
              <Header as="h3">Appointment Detail</Header>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Segment>

            <Segment clearing>
              <Button
                primary
                floated="right"
                onClick={() => alert('Reschedule appointment: TODO')}
              >
                {' '}
                Reschedule{' '}
              </Button>
              <Button
                primary
                floated="right"
                onClick={() => alert('Cancel Appointment: TODO')}
              >
                {' '}
                Cancel Appointment{' '}
              </Button>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Header as="h3">Directions</Header>
              <GoogleMaps fullAddress="University of Florida, Gainesville, FL 32611" />
            </Segment>

            <Segment clearing>
              <Button
                positive
                floated="right"
                onClick={() => alert('Navigation Page: TODO')}
              >
                {' '}
                <Icon name="location arrow" size="small" /> Navigate
              </Button>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}
