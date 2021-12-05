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
        <Grid.Column width={8}>
          <Grid.Row>
            <Header as="h1">Welcome to OnTime</Header>
            <p style={{ marginTop: 30, marginBottom: 30 }}>
              Finding a scheduling system compatible with multiple business
              types is difficult, especially ones that remain HIPAA compliant.
              OnTime provides an effective way of scheduling appointments via a
              simple web-based application.
            </p>
            <Button primary size="big" floated="left" as={Link} to="/login">
              Get Started
            </Button>
          </Grid.Row>

          <Grid.Row style={{ marginTop: 100 }}>
            <Grid.Column width={16}></Grid.Column>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={8}>
          <Image
            src="/Calendar.PNG"
            size="huge"
            style={{ height: 500, width: 650 }}
          />
        </Grid.Column>
        <Grid.Row width={16}>
          <Grid.Column width={4}>
            <Card>
              <Image src="/company.jpg" wrapped ui={false} />
              <Card.Content>
                <Card.Description>
                  Self-scheduling appointment.
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column width={4}>
            <Card>
              <Image src="/company.jpg" wrapped ui={false} />
              <Card.Content>

                <Card.Description>
                  Appointment reminders. 
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column width={4}>
            <Card>
              <Image src="/company.jpg" wrapped ui={false} />
              <Card.Content>

                <Card.Description>
                  Direction support. 
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column width={4}>
            <Card>
              <Image src="/company.jpg" wrapped ui={false} />
              <Card.Content>

                <Card.Description>
                  HIPAA compliant security.
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
