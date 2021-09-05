import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'semantic-ui-react';
import { login } from '../../api/auth';
import ValidateOtpModal from '../../components/modals/ValidateOtpModal';
import useToggle from '../../hooks/useToggle';

export default function LoginPage() {
  const [loading, { on, off }] = useToggle(false);
  const [open, openOtpTogglers] = useToggle(false);
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit() {
    on();

    const res = await login(email, password);

    if (res && res.data) {
      const { user, status } = res.data;

      if (user && status === 'pending_otp_validation') {
        openOtpTogglers.on();
        // TODO: store the user when we have a store
      }
    }

    off();
  }

  function handleCancelOtpValidation() {
    // TODO: clear store, they are cancelling mid auth flow
  }

  function handleValidOtpMatch() {
    openOtpTogglers.off();

    history.push('/');
  }

  return (
    <div>
      <ValidateOtpModal
        open={open}
        onValidMatch={handleValidOtpMatch}
        onCancel={handleCancelOtpValidation}
      />

      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Email</label>
          <Form.Input
            icon="user"
            iconPosition="left"
            placeholder="somecoolname@gmail.com"
            autoComplete="email"
            onChange={(e, { value }) => setEmail(value)}
            disabled={loading}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Input
            icon="lock"
            iconPosition="left"
            placeholder="somesecurepassword"
            type="password"
            autoComplete="current-password"
            onChange={(e, { value }) => setPassword(value)}
            disabled={loading}
          />
        </Form.Field>

        <p>
          Don't have an account? <Link to="/sign_up">Register here</Link>
        </p>

        <Button type="submit" loading={loading}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
