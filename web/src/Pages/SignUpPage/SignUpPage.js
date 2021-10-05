import { useState } from 'react';
import { Container, Segment, Header, Form, Radio } from 'semantic-ui-react';
import RegistrationForm from '../../components/Registration/RegistrationForm';

export default function SignUpPage() {
  const [formType, setFormType] = useState('NONE');

  function handleFormType(_e, { value }) {
    setFormType(value);
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
              value="USER"
              checked={formType === 'USER'}
              onChange={handleFormType}
            />
            <Form.Field
              style={{ marginTop: 15 }}
              control={Radio}
              label="Manage appointments (employee)"
              value="EMPLOYEE"
              checked={formType === 'EMPLOYEE'}
              onChange={handleFormType}
            />
            <Form.Field
              style={{ marginTop: 15 }}
              control={Radio}
              label="Register company (owner)"
              value="COMPANY_OWNER"
              checked={formType === 'COMPANY_OWNER'}
              onChange={handleFormType}
            />
          </Form.Group>
        </Form>
      </Segment>
      <RegistrationForm formType={formType} />
    </Container>
  );
}
