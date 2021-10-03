import React from 'react';
import { SettingsSectionHeader } from '../SettingsComponents';

export default function PasswordSettings() {
  return (
    <div className="settings-content__inner">
      <div className="settings-content__segment">
        <SettingsSectionHeader
          title="Password Settings"
          subtitle="This page allows you to change your password."
        />
      </div>
    </div>
  );
}
