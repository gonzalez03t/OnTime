import {
  Container,
  Grid,
  Header,
  Icon,
  Button,
  Segment,
} from 'semantic-ui-react';
import ApptCalendar from '../../components/Calendar/Calendar';
import useStore from '../../store/store';

export default function UserDashboard() {
  function handleNewAppointment() {
    // TODO
  }

  const { getUser } = useStore((state) => ({
    isAuthenticated: state.getUser,
  }));

  return (
    <Container style={{ marginTop: 100 }} fluid>
      <Header as="h1" textAlign="center">
        <Icon name="address book outline" />
        <Header.Content>User Dashboard</Header.Content>
      </Header>
      <Grid>
        <Grid.Column width={11}>
          <ApptCalendar />
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
        </Grid.Column>
        <Grid.Column width={5}>
          <Segment fluid>
            <Header as="h3" textAlign="center">
              Scheduled Reminders
            </Header>
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
}
