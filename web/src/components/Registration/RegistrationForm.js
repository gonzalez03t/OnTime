import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Segment, Header, Button, Form } from 'semantic-ui-react';
import { register } from '../../api/auth';
import useToggle from '../../hooks/useToggle';
import { useHistory } from 'react-router';
import { userFields, ownerCompanyFields } from './FormFields';

// Pending:
// Make secondary address optional. (maybe next sprint)
// If secondary address is true, then city, state, zip become required
// Handle submit for all three forms
// Fix errors
// Connect to back end

export default function RegistrationForm(props) {
  const [loading, { on, off }] = useToggle(false);
  const history = useHistory();

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    phone: '',
    email: '',
  });
  const [companyData, setCompanyData] = useState({
    companyName: '',
    companyPhone: '',
    mainAddress: '',
    city: '',
    state: '',
    zipCode: '',
    secondaryAddress: '',
    secCity: '',
    secState: '',
    secZipCode: '',
    imageURL: '',
  });

  function handleUserChange(_e, { name, value }) {
    setUserData((current) => {
      return { ...current, [name]: value };
    });
  }

  function handleCompanyChange(_e, { name, value }) {
    setCompanyData((current) => {
      return { ...current, [name]: value };
    });
  }

  async function handleSubmit() {
    on();
    const res = await register(userData);
    off();

    if (res && res.status === 201) {
      alert('SUCCESS');
      // TODO: send notification, wait like half a second then route to login
      history.push('/login');
    } else {
      // TODO: properly handle this situation
      alert('RUH ROH');
    }
  }

  // Form header
  let formHeader = 'User Information:';

  // Add reusable fields to form
  const formGroups = userFields.map((group) => (
    <Form.Group widths="equal">
      {group.map((field) => (
        <Form.Field key={field.name}>
          <label>{field.label}</label>
          <Form.Input
            name={field.name}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete}
            type={field.type}
            onChange={handleUserChange}
            disabled={loading}
            required={field.required}
          />
        </Form.Field>
      ))}
    </Form.Group>
  ));

  if (props.formType !== '0') {
    // Update Employee form header
    if (props.formType == 2) {
      formHeader = 'Employee Information:';
    }
    // Add owner company fields to form
    else if (props.formType == 3) {
      formHeader = 'Owner Information:';

      const ownerCompanyGroups = ownerCompanyFields.map((group) => (
        <Form.Group widths="equal">
          {group.map((field) => (
            <Form.Field key={field.name}>
              <label>{field.label}</label>
              <Form.Input
                name={field.name}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                type={field.type}
                onChange={handleCompanyChange}
                disabled={loading}
                required={field.required}
              />
            </Form.Field>
          ))}
        </Form.Group>
      ));

      formGroups.push(
        <Header as="h3" style={{ marginTop: 35, marginBottom: 15 }}>
          Company Information:
        </Header>
      );
      formGroups.push(...ownerCompanyGroups);
    }

    return (
      <Container style={{ marginTop: 20 }}>
        <Segment padded raised>
          <Form onSubmit={handleSubmit}>
            <Header as="h3" style={{ marginTop: 10, marginBottom: 15 }}>
              {' '}
              {formHeader}{' '}
            </Header>
            {formGroups}

            <p style={{ marginTop: 30 }}>
              Already have an account? <Link to="/login">Login here</Link>
            </p>

            <Button type="submit" loading={loading}>
              Submit
            </Button>
          </Form>
        </Segment>
      </Container>
    );
  } else {
    return null;
  }
}
