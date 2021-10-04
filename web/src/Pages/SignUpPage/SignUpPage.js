import { useState } from 'react';
import { Container, Segment, Header, Form, Radio } from 'semantic-ui-react';
import RegistrationForm from '../../components/Registration/RegistrationForm';

export default function SignUpPage() {
  const [value, setValue] = useState('0');

  function handleFormType(_e, { value }) {
    console.log(value);
    setValue(value);
  }

  return (
    <Container style={{ marginTop: 100 }}>
      <Segment secondary padded raised>
        <Header as="h3">What is your intended usage?</Header>
        <Form style={{ marginTop: 30 }}>
          <Form.Group inline>
            <Form.Field
              style={{ marginTop: 15 }}
              control={Radio}
              label="Make appointments (costumer)"
              value="1"
              checked={value === '1'}
              onChange={handleFormType}
            />
            <Form.Field
              style={{ marginTop: 15 }}
              control={Radio}
              label="Manage appointments (employee)"
              value="2"
              checked={value === '2'}
              onChange={handleFormType}
            />
            <Form.Field
              style={{ marginTop: 15 }}
              control={Radio}
              label="Register company (owner)"
              value="3"
              checked={value === '3'}
              onChange={handleFormType}
            />
          </Form.Group>
        </Form>
      </Segment>
      <RegistrationForm formType={value} />
    </Container>
  );
}
