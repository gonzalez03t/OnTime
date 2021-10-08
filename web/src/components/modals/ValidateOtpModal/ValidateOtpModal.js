import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { Button, Modal } from 'semantic-ui-react';
import { generateNewOtp } from '../../../api/auth';
import useToggle from '../../../hooks/useToggle';

import './ValidateOtpModal.css';

// TODO: generalize this component so it takes in a validator function.
// validator function takes in code, and internally calls the proper
// endpoint. i.e.
// res = await validator(code);
export default function ValidateOtpModal({
  open,
  validator,
  onValidMatch,
  onCancel,
}) {
  const [loadingValidate, loadingValidateToggles] = useToggle(false);
  const [loadingNewCode, loadingNewCodeToggles] = useToggle(false);
  const [otp, setOtp] = useState('');

  async function handleValidateOtp() {
    loadingValidateToggles.on();
    const res = await validator(otp);
    loadingValidateToggles.off();

    if (res && res.status === 200) {
      onValidMatch();
    } else {
      alert('INCORRECT');
    }
  }

  async function handleSendNewOtp() {
    loadingNewCodeToggles.on();
    const res = await generateNewOtp();

    if (res?.status === 201) {
      // TODO: notify user it worked
      alert('TODO: alert using notifications it worked');
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
