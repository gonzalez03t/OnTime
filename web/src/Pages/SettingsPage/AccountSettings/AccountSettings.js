import React from 'react';
import { SettingsSectionHeader } from '../SettingsComponents';

export default function AccountSettings() {
  return (
    <div className="settings-content__inner">
      <div className="settings-content__segment">
        <SettingsSectionHeader
          title="Account Settings"
          subtitle="This page allows you to view and edit your basic profile information."
        />
      </div>
    </div>
  );
}
