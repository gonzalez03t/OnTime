import React from 'react';
import { SettingsSectionHeader } from '../SettingsComponents';
import PasswordSettingsForm from './PasswordSettingsForm';

export default function PasswordSettings() {
  return (
    <div className="settings-content__inner">
      <div className="settings-content__segment">
        <div className="settings-content__segment-body">
          <SettingsSectionHeader
            title="Password Settings"
            subtitle="This page allows you to change your password. You will receieve a confirmation code via SMS before your changes are finalized."
          />
        </div>

        <PasswordSettingsForm />
      </div>
    </div>
  );
}
