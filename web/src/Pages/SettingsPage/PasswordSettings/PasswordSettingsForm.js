import React, { useState } from 'react';
import { Form, Icon, Message } from 'semantic-ui-react';
import { createChangePasswordToken } from '../../../api/token';
import { updateUserPassword } from '../../../api/user';
import ValidateOtpModal from '../../../components/modals/ValidateOtpModal/ValidateOtpModal';
import useToggle from '../../../hooks/useToggle';
import useStore from '../../../store/store';
import isWeakPassword from '../../../utils/isWeakPassword';
import okResponse from '../../../utils/okResponse';

const initialError = {
  status: false,
  title: '',
  message: '',
};

export default function PasswordSettingsForm() {
  const [visible, { toggle }] = useToggle(false);
  const [isModalOpen, { on, off }] = useToggle(false);

  const [passwords, setPasswords] = useState({});
  const [error, setError] = useState(initialError);

  const notify = useStore((state) => state.addNotification);

  async function initOtpValidation() {
    const res = await createChangePasswordToken();

    if (okResponse(res)) {
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
      notify('warning', 'Please use a stronger password');
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
    notify('success', 'Password updated');
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
