import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { Button, Modal } from 'semantic-ui-react';
import { generateNewOtp } from '../../../api/auth';
import useToggle from '../../../hooks/useToggle';
import useStore from '../../../store/store';
import okResponse from '../../../utils/okResponse';

import './ValidateOtpModal.css';

export default function ValidateOtpModal({
  open,
  validator,
  onValidMatch,
  onCancel,
}) {
  const [loadingValidate, loadingValidateToggles] = useToggle(false);
  const [loadingNewCode, loadingNewCodeToggles] = useToggle(false);
  const [otp, setOtp] = useState('');

  const notify = useStore((state) => state.addNotification);

  async function handleValidateOtp() {
    loadingValidateToggles.on();
    const res = await validator(otp);
    loadingValidateToggles.off();

    if (res && res.status === 200) {
      onValidMatch();
    } else {
      notify('error', 'Incorrect');
    }
  }

  async function handleSendNewOtp() {
    loadingNewCodeToggles.on();
    const res = await generateNewOtp();

    if (okResponse(res)) {
      notify(
        'info',
        'If an account exists, please check your phone for an updated code'
      );
    } else {
      // TODO: notify user there was a problem trying to complete request
      notify('error', 'An error ocurred');
      console.log(res);
    }
    loadingNewCodeToggles.off();
  }

  return (
    <Modal size="tiny" open={open}>
      <Modal.Header>Verify Login</Modal.Header>
      <Modal.Content>
        <p>
          If the account exists you will recieve a code via SMS. Please enter
          the code you received below:
        </p>

        <OtpInput
          value={otp}
          onChange={(val) => setOtp(val)}
          numInputs={4}
          separator={<span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>}
          inputStyle="otp-input"
        />
      </Modal.Content>
      <Modal.Actions>
        <Button disabled={loadingNewCode || loadingValidate} onClick={onCancel}>
          Cancel
        </Button>
        <Button secondary loading={loadingNewCode} onClick={handleSendNewOtp}>
          Send New Code
        </Button>
        <Button primary loading={loadingValidate} onClick={handleValidateOtp}>
          Confirm
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
