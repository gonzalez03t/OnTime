import React from 'react';
import useStore from '../../../store/store';
import { SettingsSectionHeader } from '../SettingsComponents';
import NoCompanyMessage from './NoCompanyMessage';
import './CompanySettings.css';

export default function CompanySettings() {
  const isCompanyOwner = useStore((state) => state.isCompanyOwner);

  return (
    <div>
      <div className="settings-content__segment">
        <SettingsSectionHeader
          title="Company Settings"
          subtitle="This page allows you to manage your company"
        />

        <div className="company-settings__inner">
          {isCompanyOwner() ? (
            <div>TODO: load company info</div>
          ) : (
            <NoCompanyMessage />
          )}
        </div>
      </div>
    </div>
  );
}
