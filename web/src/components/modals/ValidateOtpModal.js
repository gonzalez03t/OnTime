import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { Button, Modal } from 'semantic-ui-react';
import { generateNewOtp, validateOtp } from '../../api/auth';
import useToggle from '../../hooks/useToggle';

export default function ValidateOtpModal({ open, onValidMatch, onCancel }) {
  const [loadingValidate, loadingValidateToggles] = useToggle(false);
  const [loadingNewCode, loadingNewCodeToggles] = useToggle(false);
  const [otp, setOtp] = useState('');

  async function handleValidateOtp() {
    loadingValidateToggles.on();
    const res = await validateOtp(otp);
    loadingValidateToggles.off();

    if (res && res.data && res.data.valid) {
      alert('CORRECT');
      onValidMatch();
    } else {
      alert('INCORRECT');
    }
  }

  async function handleSendNewOtp() {
    loadingNewCodeToggles.on();
    const res = await generateNewOtp();

    if (res && res.status === 201) {
      // TODO: notify user it worked
      alert('SENT NEW OTP');
    } else {
      // TODO: notify user there was a problem trying to complete request
      console.log(res);
    }
    loadingNewCodeToggles.off();
  }

  return (
    <Modal size="tiny" open={open}>
      <Modal.Header>Verify Login</Modal.Header>
      <Modal.Content>
        <p>Please enter the code we sent to your device</p>

        <OtpInput
          value={otp}
          onChange={(val) => setOtp(val)}
          numInputs={6}
          separator={<span>-</span>}
          inputStyle={{ width: '3rem', height: '3rem' }}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button disabled={loadingNewCode || loadingValidate} onClick={onCancel}>
          Cancel
        </Button>
        <Button loading={loadingNewCode} onClick={handleSendNewOtp}>
          Send New Code
        </Button>
        <Button loading={loadingValidate} onClick={handleValidateOtp}>
          Confirm
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
