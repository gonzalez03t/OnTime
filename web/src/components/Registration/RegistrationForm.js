import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Segment, Header, Button, Form, Select } from 'semantic-ui-react';
import { register, registerUserAndCompany } from '../../api/auth';
import useToggle from '../../hooks/useToggle';
import { useHistory } from 'react-router';
import { userFields, ownerCompanyFields, countryOptions } from './FormFields';
import clsx from 'clsx';

// Pending:
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
    unit: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
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

    console.log(userData);
    console.log(companyData);

    if (formType === 'COMPANY_OWNER') {

      res = await registerUserAndCompany(userData, {
        companyName: companyData.companyName,
        companyPhone: companyData.companyPhone,
        address: {
          street: companyData.streetAddress,
          unit: companyData.unit,
          city: companyData.city,
          stateProvince: companyData.state,
          postalCode: companyData.postalCode,
          country: companyData.country, 
        },
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

      // Add country selector to list
      ownerCompanyGroups.push(
        <Form.Group widths="equal">
          <Form.Field>
            <label>Country:</label>
            <Form.Select
              name="country"
              placeholder="United States"
              autoComplete="country"
              type="country"
              required="true"
              options={countryOptions}
              onChange={handleCompanyChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Would you like to add additional addresses?</label>
            <Form.Select
              placeholder="No"
              required="true"
              options={[{value: false, text: "No"}, {value: true, text: "Yes"} ]}
            />
          </Form.Field>
      </Form.Group>
      );

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
