import React from 'react';
import { Button } from 'semantic-ui-react';
import { SettingsSectionSubHeader } from '../SettingsComponents';

export default function DeleteAccount() {
  async function handleDeleteAccount() {
    alert('TODO');
  }

  return (
    <div className="settings-form__body">
      <SettingsSectionSubHeader
        title="Delete Account"
        subtitle="Once deleted, you will lose all data associated with it. This cannot be undone."
      />

      <Button
        style={{ marginTop: '0.75rem' }}
        negative
        onClick={handleDeleteAccount}
      >
        Delete Account
      </Button>
    </div>
  );
}
