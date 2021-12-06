import React from 'react';
import {
  Container,
  Grid,
  Header,
  Button,
  Placeholder,
  Image,
  Card,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Container style={{ marginTop: 50 }}>
      <Grid>
        <Grid.Column width={7}>
          <Grid.Row>
            <Header as="h1">Welcome to OnTime</Header>
            <p style={{ marginTop: 30 }}>
              Finding a scheduling system compatible with multiple business
              types is difficult, especially ones that remain HIPAA compliant.
              OnTime provides an effective way of scheduling appointments via a
              simple web-based application.
            </p>
            <p style={{ marginBottom: 30 }}>
              The application’s main features are a self-scheduling appointment system 
              which includes creating new appointments, rescheduling existing appointments, 
              and canceling existing appointments. In addition, OnTime provides an appointment 
              reminder and notifications system, appointment navigation support, 
              and HIPAA-compliant security. 
            </p>
            <Button primary size="big" floated="left" as={Link} to="/login">
              Get Started
            </Button>
          </Grid.Row>

          <Grid.Row style={{ marginTop: 100 }}>
            <Grid.Column width={16}></Grid.Column>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={9}>
          <Image
            src="/Calendar.PNG"
            size="huge"
            style={{ height: 440, width: 650 }}
          />
        </Grid.Column>
        <Grid.Row width={16}>
          <Grid.Column width={4}>
            <Card style={{ width: '95%' }}  color='blue'>
              <Image src="/apt.jpg" wrapped ui={false} />
              <Card.Content>
                <Card.Description>
                  <b>Self-scheduling appointment</b>
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column width={4}>
            <Card style={{ width: '95%' }}  color='blue'>
              <Image src="/reminder.jpg" wrapped ui={false} />
              <Card.Content>
                <Card.Description>
                  <b>Appointment reminders</b>
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column width={4}>
            <Card style={{ width: '95%' }}  color='blue'>
              <Image src="/nav.jpg" wrapped ui={false} />
              <Card.Content>
                <Card.Description>
                  <b>Direction support</b>
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column width={4}>
            <Card style={{ width: '95%' }}  color='blue'>
              <Image src="/hipa.jpg" wrapped ui={false} />
              <Card.Content>
                <Card.Description>
                  <b>HIPAA compliant security</b>
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

//style={{ height: 400, width: 350 }}
