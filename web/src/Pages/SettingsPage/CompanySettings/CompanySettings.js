import React from 'react';
import useStore from '../../../store/store';
import { SettingsSectionHeader } from '../SettingsComponents';
import NoCompanyMessage from './NoCompanyMessage';
import './CompanySettings.css';
import CompanyInfoSettings from './CompanyInfoSettings';
import shallow from 'zustand/shallow';

export default function CompanySettings() {
  const isCompanyOwner = useStore((state) => state.isCompanyOwner, shallow);

  return (
    <div className="settings-content__inner">
      <div className="settings-content__segment">
        <div className="settings-content__segment-body">
          <SettingsSectionHeader
            title="Company Settings"
            subtitle="This page allows you to manage your company"
          />
        </div>

        {isCompanyOwner() ? <CompanyInfoSettings /> : <NoCompanyMessage />}
      </div>
    </div>
  );
}
