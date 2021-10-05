import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Segment, Header, Button, Form } from 'semantic-ui-react';
import { register, registerUserAndCompany } from '../../api/auth';
import useToggle from '../../hooks/useToggle';
import { useHistory } from 'react-router';
import { userFields, ownerCompanyFields } from './FormFields';
import clsx from 'clsx';

// Pending:
// Pass company data to api... (Connect to back end)
// Fix errors
// Make secondary address optional. (maybe next sprint)
// If secondary address is true, then city, state, zip become required

export default function RegistrationForm({ formType }) {
  const history = useHistory();

  const [loading, { on, off }] = useToggle(false);

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
    streetAddress: '',
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

  // TODO: handle employee registration, I think the backend needs work to support this
  async function handleSubmit() {
    on();
    let res;

    if (formType === 'COMPANY_OWNER') {
      // TODO: don't perform this after this issue is completed (https://github.com/medapt/ontime/issues/77)
      res = await registerUserAndCompany(userData, {
        ...companyData,
        fullAddress: [
          companyData.streetAddress,
          companyData.city,
          clsx(companyData.state, companyData.zipCode),
        ].join(', '),
      });
    } else if (formType === 'EMPLOYEE') {
      // TODO:
    } else {
      res = await register(userData);
    }

    off();

    console.log(res);

    if (res?.status === 201) {
      alert('SUCCESS');

      // TODO: send notification

      // wait half a second then route to login
      setTimeout(() => history.push('/login'), 500);
    } else {
      // TODO: properly handle this situation
      alert('RUH ROH');
    }
  }

  // Form header
  let formHeader = 'User Information:';

  // Add reusable fields to form
  const formGroups = userFields.map((group, i) => (
    <Form.Group widths="equal" key={String('user-group-' + i)}>
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

  if (formType !== 'NONE') {
    // Update Employee form header
    if (formType === 'EMPLOYEE') {
      formHeader = 'Employee Information:';
    }
    // Add owner company fields to form
    else if (formType === 'COMPANY_OWNER') {
      formHeader = 'Owner Information:';

      const ownerCompanyGroups = ownerCompanyFields.map((group, i) => (
        <Form.Group widths="equal" key={String('owner-group-' + i)}>
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
        <Header
          as="h3"
          style={{ marginTop: 35, marginBottom: 15 }}
          key="FORM_HEADING"
        >
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
