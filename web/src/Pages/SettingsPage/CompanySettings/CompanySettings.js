import React from 'react';
import useStore from '../../../store/store';
import { SettingsSectionHeader } from '../SettingsComponents';
import NoCompanyMessage from './NoCompanyMessage';
import './CompanySettings.css';

export default function CompanySettings() {
  const isCompanyOwner = useStore((state) => state.isCompanyOwner);

  return (
    <div className="settings-content__inner">
      <div className="settings-content__segment">
        <div className="settings-content__segment-body">
          <SettingsSectionHeader
            title="Company Settings"
            subtitle="This page allows you to manage your company"
          />
        </div>

        <div className="settings-form__body">
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
