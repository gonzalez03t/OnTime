import React from 'react';
import { SettingsSectionHeader } from '../SettingsComponents';
import UserInformationForm from './UserInformationForm';

export default function AccountSettings() {
  return (
    <div className="settings-content__inner">
      <div className="settings-content__segment">
        <div className="settings-content__segment-body">
          <SettingsSectionHeader
            title="Profile Settings"
            subtitle="This page allows you to view and edit your basic profile information."
          />
        </div>

        <UserInformationForm />
      </div>

      <div className="settings-content__segment">
        <div className="settings-content__segment-body">
          <SettingsSectionHeader
            title="Notification Settings"
            subtitle="This page allows you to view and edit your basic profile information."
          />
        </div>

        <UserInformationForm />
      </div>
    </div>
  );
}
