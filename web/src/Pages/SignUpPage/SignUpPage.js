import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import { register } from '../../api/auth';
import useToggle from '../../hooks/useToggle';
import { useHistory } from 'react-router';

export default function SignUpPage() {
  const [loading, { on, off }] = useToggle(false);
  const history = useHistory();

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

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Field>
            <label>First name</label>
            <Form.Input
              name="firstName"
              placeholder="Bob"
              autoComplete="given-name"
              onChange={handleChange}
              disabled={loading}
              required
            />
          </Form.Field>

          <Form.Field>
            <label>Last name</label>
            <Form.Input
              name="lastName"
              placeholder="Burger"
              autoComplete="family-name"
              onChange={handleChange}
              disabled={loading}
              required
            />
          </Form.Field>
        </Form.Group>

        <Form.Field>
          <label>Password</label>
          <Form.Input
            name="password"
            placeholder="supersecurepassword"
            autoComplete="password"
            type="password"
            onChange={handleChange}
            disabled={loading}
            required
          />
        </Form.Field>

        <Form.Group>
          <Form.Field width="10">
            <label>Email address</label>
            <Form.Input
              name="email"
              placeholder="somecoolname@gmail.com"
              autoComplete="email"
              onChange={handleChange}
              disabled={loading}
              required
            />
          </Form.Field>

          <Form.Field width="6">
            <label>Phone number</label>
            <Form.Input
              name="phone"
              placeholder="555-555-5555"
              autoComplete="tel"
              type="tel"
              onChange={handleChange}
              disabled={loading}
              required
            />
          </Form.Field>
        </Form.Group>

        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>

        <Button type="submit" loading={loading}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
