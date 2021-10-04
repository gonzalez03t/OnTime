import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Segment, Header, Button, Form } from 'semantic-ui-react';
import { register } from '../../api/auth';
import useToggle from '../../hooks/useToggle';
import { useHistory } from 'react-router';

const fields = [
  [
    {
      "name": "First Name",
      "placeholder": "Bob",
      "autoComplete": "given-name",
      "type": ""
    },
    {
      "name": "Last Name",
      "placeholder": "Burger",
      "autoComplete": "family-name",
      "type" : ""
    }
  ],
  [
    {
      "name": "Password",
      "placeholder": "supersecurepassword",
      "autoComplete": "password",
      "type": "password",
    }
  ],
  [
    {
      "name": "Email address",
      "placeholder": "somecoolname@gmail.com",
      "autoComplete": "email",
      "width": "4"
    },
    {
      "name": "Phone number",
      "placeholder": "555-555-5555",
      "autoComplete": "tel",
      "type": "tel"
    }
  ],
];


export default function RegistrationForm(props) {
  const [loading, { on, off }] = useToggle(false);
  const history = useHistory();
  let form = null;

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    phone: '',
    email: '',
  });

  function handleChange(_e, { name, value }) {
    setUserData((current) => {
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

  const fieldList = fields.map((group) =>
    <Form.Group widths="equal">
      {
        group.map((field) =>
          <Form.Field key={field.name} > 
            <label>{field.name}</label>
            <Form.Input
              name={field.name}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              type={field.type}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </Form.Field>
        )
      }
    </Form.Group>
  );

  if (props.formType !== '0') {

    if (props.formType == 1) {
      // continue here...
    }

    return (
      <Container style={{ marginTop: 20 }}>
        <Segment padded raised>
          <Form onSubmit={handleSubmit} style={{ marginTop: 30 }}>

            {fieldList}

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
