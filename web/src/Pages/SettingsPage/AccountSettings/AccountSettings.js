import React from 'react';
import { SettingsSectionHeader } from '../SettingsComponents';
import DeleteAccount from './DeleteAccount';
import UserInformationForm from './UserInformationForm';
import UserNotificationForm from './UserNotificationForm';

export default function AccountSettings() {
  return (
    <div className="settings-content__inner">
      <div className="settings-content__segment">
        <div className="settings-content__segment-body">
          <SettingsSectionHeader
            title="Profile Settings"
            subtitle="This section allows you to view and edit your basic profile information."
          />
        </div>

        <UserInformationForm />
      </div>

      <div className="settings-content__segment">
        <div className="settings-content__segment-body">
          <SettingsSectionHeader
            title="Notification Settings"
            subtitle="This section allows you to view and edit notification preferences."
          />
        </div>

        <UserNotificationForm />
      </div>

      <div className="settings-content__segment">
        <div className="settings-content__segment-body">
          <SettingsSectionHeader
            title="Account Settings"
            subtitle="This section contains broader-level account options."
          />
        </div>

        <DeleteAccount />
      </div>
    </div>
  );
}
