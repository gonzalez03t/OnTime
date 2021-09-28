import React, { useState } from 'react';
import SettingsNav from './SettingsNav/SettingsNav';
import AccountSettings from './AccountSettings/AccountSettings';
import CompanySettings from './CompanySettings/CompanySettings';
import PasswordSettings from './PasswordSettings/PasswordSettings';

import './SettingsPage.css';

export default function SettingsPage() {
  const [tab, setTab] = useState('account');

  function getTabContent() {
    switch (tab) {
      case 'account':
        return <AccountSettings />;
      case 'password':
        return <PasswordSettings />;
      case 'company':
        return <CompanySettings />;

      default:
        return null;
    }
  }

  return (
    <div className="settings-container">
      <SettingsNav tab={tab} setTab={setTab} />
      <div className="settings-content__outer">{getTabContent()}</div>
    </div>
  );
}
