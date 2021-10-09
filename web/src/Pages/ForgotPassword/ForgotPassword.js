import React, { useState } from 'react';
import { useHistory } from 'react-router';
import {
  Button,
  Container,
  Form,
  Icon,
  Message,
  Segment,
} from 'semantic-ui-react';
import { forgotPassword } from '../../api/auth';
import { createForgotPasswordToken } from '../../api/token';
import ValidateOtpModal from '../../components/modals/ValidateOtpModal/ValidateOtpModal';
import useToggle from '../../hooks/useToggle';
import isWeakPassword from '../../utils/isWeakPassword';
import okResponse from '../../utils/okResponse';
import { SettingsSectionHeader } from '../SettingsPage/SettingsComponents';

const initalState = {
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

const initialError = {
  status: false,
  title: '',
  message: '',
};

export default function ForgotPassword() {
  const history = useHistory();

  const [userInfo, setUserInfo] = useState(initalState);
  const [isModalOpen, { on, off }] = useToggle(false);
  const [passVisible, { toggle }] = useToggle(false);
  const [error, setError] = useState(initialError);

  async function validator(code) {
    const { email, phone, password } = userInfo;

    return forgotPassword(email, phone, code, password);
  }

  function handleValidOtpMatch() {
    alert('TODO: NOTIFY PASSWORD RESET');
    off();

    setTimeout(() => history.push('/login'));
  }

  function handleCancelOtpValidation() {
    off();
  }

  function handleChange(e, { name, value }) {
    setUserInfo((curr) => {
      return { ...curr, [name]: value };
    });
  }

  async function handleSubmit() {
    const { password, confirmPassword } = userInfo;

    setError(initialError);

    if (!password || !confirmPassword) {
      setError({
        status: true,
        title: 'Empty password not allowed',
        message: 'You must provide a password',
      });
    } else if (password !== confirmPassword) {
      setError({
        status: true,
        title: 'Passwords do not match',
        message: 'The passwords must match',
      });
    } else if (isWeakPassword(password)) {
      alert('TODO: handle WEAK password');
    } else {
      initOtpValidation();
    }
  }

  async function initOtpValidation() {
    const { email, phone } = userInfo;

    const res = await createForgotPasswordToken(email, phone);

    if (okResponse(res)) {
      on();
    } else {
      // TODO: notify
    }
  }

  return (
    <Container style={{ marginTop: 100 }}>
      <Segment padded raised>
        <ValidateOtpModal
          open={isModalOpen}
          validator={validator}
          onValidMatch={handleValidOtpMatch}
          onCancel={handleCancelOtpValidation}
        />

        <Form onSubmit={handleSubmit}>
          <SettingsSectionHeader
            title="Forgot Password"
            subtitle="Enter the email and phone number associated with your account, as well as a new password"
          />

          <Form.Group widths="equal" style={{ marginTop: '1.5rem' }}>
            <Form.Field>
              <label>Email</label>
              <Form.Input
                name="email"
                icon="user"
                iconPosition="left"
                placeholder="somecoolname@gmail.com"
                autoComplete="email"
                onChange={handleChange}
                disabled={isModalOpen}
              />
            </Form.Field>

            <Form.Field>
              <label>Phone</label>
              <Form.Input
                name="phone"
                icon="phone"
                iconPosition="left"
                placeholder="4558112413"
                autoComplete="phone"
                onChange={handleChange}
                disabled={isModalOpen}
              />
            </Form.Field>
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Input
              label="New Password"
              name="password"
              type={passVisible ? 'text' : 'password'}
              onChange={handleChange}
              error={error.status}
              autoComplete="off"
              icon={
                <Icon
                  onClick={toggle}
                  name={passVisible ? 'lock open' : 'lock'}
                  link
                />
              }
            />
            <Form.Input
              label="Confirm New Password"
              name="confirmPassword"
              type={passVisible ? 'text' : 'password'}
              onChange={handleChange}
              error={error.status}
              autoComplete="off"
              icon={
                <Icon
                  onClick={toggle}
                  name={passVisible ? 'lock open' : 'lock'}
                  link
                />
              }
            />
          </Form.Group>

          <Message error header={error.title} content={error.message} />

          <Button type="submit" loading={isModalOpen}>
            Submit
          </Button>
        </Form>
      </Segment>
    </Container>
  );
}
