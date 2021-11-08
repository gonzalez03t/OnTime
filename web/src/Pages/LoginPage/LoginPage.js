import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Container, Segment, Button, Form, Input } from 'semantic-ui-react';
import { login, validateOtp } from '../../api/auth';
import ValidateOtpModal from '../../components/modals/ValidateOtpModal/ValidateOtpModal';
import useToggle from '../../hooks/useToggle';
import useStore from '../../store/store';

export default function LoginPage() {
  const history = useHistory();

  const { isAuthenticated, setUser, setUserStatus } = useStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    setUser: state.setUser,
    setUserStatus: state.setUserStatus,
  }));

  const notify = useStore((state) => state.addNotification);

  const [loading, { on, off }] = useToggle(false);
  const [open, openOtpTogglers] = useToggle(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit() {
    on();

    const res = await login(email, password);

    if (res && res.data) {
      const { user, status } = res.data;

      if (user && status === 'pending_otp_validation') {
        setUser({ ...user, status });
        openOtpTogglers.on();
      }
    }

    off();
  }

  function handleCancelOtpValidation() {
    // they are cancelling mid auth flow, so remove user from store
    setUser(null);
    openOtpTogglers.off();
  }

  function handleValidOtpMatch() {
    openOtpTogglers.off();

    notify('success', 'Logged in successfully');

    setTimeout(() => {
      setUserStatus('authenticated');
      history.push('/dashboard');
    }, 500);
  }

  async function validator(code) {
    return validateOtp(code);
  }

  // empty dep array so it only runs this once on initial render
  useEffect(() => {
    if (isAuthenticated()) {
      history.push('/');
    }
  }, []);

  return (
    <Container style={{ marginTop: 100 }}>
      <Segment padded raised>
        <ValidateOtpModal
          open={open}
          validator={validator}
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

          <p style={{ margin: '0rem' }}>
            Forgot your password? <Link to="/forgot_password">Click here</Link>
          </p>

          <p
            style={{
              margin: '0rem',
              marginTop: '0.25rem',
              marginBottom: '1em',
            }}
          >
            Don't have an account? <Link to="/sign_up">Register here</Link>
          </p>

          <Button type="submit" loading={loading}>
            Submit
          </Button>
        </Form>
      </Segment>
    </Container>
  );
}
