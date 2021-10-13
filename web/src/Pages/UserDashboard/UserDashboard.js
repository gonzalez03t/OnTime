import {
  Container,
  Header,
  Grid,
  Icon,
  Button,
  Segment,
} from 'semantic-ui-react';
import ApptCalendar from '../../components/Calendar/Calendar';
import useStore from '../../store/store';
import shallow from 'zustand/shallow';
import './UserDashBoard.css';

export default function UserDashboard() {
  function handleNewAppointment() {
    // TODO
  }

  const { user } = useStore(
    (state) => ({
      user: state.user,
    }),
    shallow
  );

  return (
    <Container style={{ marginTop: 20 }}>
      <Header as="h1" textAlign="center">
        <Icon name="address book outline" />
        <Header.Content>User Dashboard</Header.Content>
      </Header>
      <Grid columns={2} centered>
        <Grid.Column width={12} id="calendar-column">
          <Segment className="calendar-segment">
            <ApptCalendar user={user} />
            <Button
              onClick={handleNewAppointment}
              icon
              basic
              size="big"
              color="black"
              style={{ marginTop: 10 }}
              floated="right"
            >
              <Icon name="calendar plus" />
            </Button>
          </Segment>
        </Grid.Column>
        <Grid.Column stretched width={4} id="segment-column">
          <Segment className="reminders-segment">
            <Header as="h3">Scheduled Reminders</Header>
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
}
