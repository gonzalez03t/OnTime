import { useState } from 'react';
import { Container, Segment, Header, Button, Form } from 'semantic-ui-react';
import { registerCompany } from '../../../../api/company';
import { viewer } from '../../../../api/user';
import useToggle from '../../../../hooks/useToggle';
import { useHistory } from 'react-router';
import {
  ownerCompanyFields,
  countryOptions,
} from '../../../../components/Registration/FormFields';
import useStore from '../../../../store/store';
import okResponse from '../../../../utils/okResponse';

// Pending:
// Make secondary address optional. (maybe next sprint)
// If secondary address is true, then city, state, zip become required

export default function CompanyRegisterForm() {
  const history = useHistory();
  const [loading, { on, off }] = useToggle(false);

  const { setUser, notify } = useStore((state) => ({
    setUser: state.setUser,
    notify: state.addNotification,
  }));

  const [companyData, setCompanyData] = useState({
    companyName: '',
    companyPhone: '',
    streetAddress: '',
    unit: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  function handleCompanyChange(_e, { name, value }) {
    setCompanyData((current) => {
      return { ...current, [name]: value };
    });
  }

  async function createCompany() {
    const res = await registerCompany(
      companyData.companyName,
      {
        street: companyData.streetAddress,
        unit: companyData.unit,
        city: companyData.city,
        stateProvince: companyData.state,
        postalCode: companyData.postalCode,
        country: companyData.country,
      },
      companyData.companyPhone
    );

    if (okResponse(res)) {
      const user = await viewer();

      if (user) {
        setUser(user);
      } else {
        notify('error', 'An unknown error occurred');
      }

      history.push('/dashboard');
    } else {
      console.log(res);
      alert('RUH ROH');
    }
  }

  async function handleSubmit() {
    on();
    createCompany();
  }

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
          options={[
            { value: false, text: 'No' },
            { value: true, text: 'Yes' },
          ]}
        />
      </Form.Field>
    </Form.Group>
  );

  return (
    <Container style={{ marginTop: 20 }}>
      <Segment padded raised>
        <Form onSubmit={handleSubmit}>
          <Header
            as="h3"
            style={{ marginTop: 35, marginBottom: 15 }}
            key="FORM_HEADING"
          >
            Company Information:
          </Header>
          {ownerCompanyGroups}

          <Button type="submit" loading={loading}>
            Submit
          </Button>
        </Form>
      </Segment>
    </Container>
  );
}
