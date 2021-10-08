import React, { useEffect, useState } from 'react';
import { Form, Icon, Message } from 'semantic-ui-react';
import { PasswordStrength } from 'tai-password-strength';
import { createChangePasswordToken } from '../../../api/token';
import { updateUserPassword } from '../../../api/user';
import ValidateOtpModal from '../../../components/modals/ValidateOtpModal/ValidateOtpModal';
import useToggle from '../../../hooks/useToggle';

const initialError = {
  status: false,
  title: '',
  message: '',
};

const WEAK_CODES = ['VERY_WEAK', 'WEAK'];

export default function PasswordSettingsForm() {
  const [tester, setTester] = useState();

  const [visible, { toggle }] = useToggle(false);
  const [isModalOpen, { on, off }] = useToggle(false);

  const [passwords, setPasswords] = useState({});
  const [error, setError] = useState(initialError);

  useEffect(() => {
    setTester(new PasswordStrength());
  }, []);

  function isWeakPassword(password) {
    return false;
    const results = tester.check(password);

    console.log(results);

    return WEAK_CODES.includes(results?.strengthCode);
  }

  async function initOtpValidation() {
    const res = await createChangePasswordToken();

    if (res?.status === 201) {
      on();
    } else {
      // TODO: notify
    }
  }

  async function handleSubmit(e) {
    console.log(e);
    const { password, confirmPassword } = passwords;

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

  async function validator(code) {
    return updateUserPassword(passwords.password, code);
  }

  function handleChange(e, { name, value }) {
    setPasswords((curr) => {
      return { ...curr, [name]: value };
    });
  }

  function handleValidMatch() {
    alert('PASSWORD CHANGED');
    off();
  }

  function handleCancel() {
    off();
  }

  return (
    <React.Fragment>
      <ValidateOtpModal
        open={isModalOpen}
        validator={validator}
        onValidMatch={handleValidMatch}
        onCancel={handleCancel}
      />
      <Form onSubmit={handleSubmit} error={error.status} autoComplete="off">
        <div className="settings-form__body">
          <Form.Group widths="equal">
            <Form.Input
              label="New Password"
              name="password"
              type={visible ? 'text' : 'password'}
              onChange={handleChange}
              error={error.status}
              autoComplete="off"
              icon={
                <Icon
                  onClick={toggle}
                  name={visible ? 'lock open' : 'lock'}
                  link
                />
              }
            />
            <Form.Input
              label="Confirm New Password"
              name="confirmPassword"
              type={visible ? 'text' : 'password'}
              onChange={handleChange}
              error={error.status}
              autoComplete="off"
              icon={
                <Icon
                  onClick={toggle}
                  name={visible ? 'lock open' : 'lock'}
                  link
                />
              }
            />
          </Form.Group>

          <Message error header={error.title} content={error.message} />
        </div>
        <div className="settings-form__actions">
          <Form.Button primary>Save</Form.Button>
        </div>
      </Form>
    </React.Fragment>
  );
}
