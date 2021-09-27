import React from 'react';
import {
  Container,
  Grid,
  Header,
  Button,
  Placeholder,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Container style={{ marginTop: 100 }}>
      <Grid>
        <Grid.Column width={10}>
          <Header as="h1">Welcome to OnTime</Header>
          <Header as="h2">An application that...</Header>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
            aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
            imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
            link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus
            elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo
            ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam
            lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
            viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean
            imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper
            ultricies nisi.
          </p>
          <Button size="big" floated="center" as={Link} to="/login">
            Login
          </Button>
          <Button size="big" floated="left" as={Link} to="/sign_up">
            Get Started
          </Button>
        </Grid.Column>
        <Grid.Column width={6}>
          <Placeholder style={{ height: 400, width: 350 }}>
            <Placeholder.Image />
          </Placeholder>
        </Grid.Column>
      </Grid>
    </Container>
  );
}
