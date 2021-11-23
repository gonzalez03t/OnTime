import React, { useEffect, useState } from 'react';
import useStore from '../../../store/store';
import { SettingsSectionHeader } from '../SettingsComponents';
import NoCompanyMessage from './NoCompanyMessage';
import './CompanySettings.css';
import CompanyFormWrapper from './CompanyFormWrapper';
import CompanyInfoForm from './CompanyInfoForm';
import shallow from 'zustand/shallow';
import { getCompanyByOwnerId } from '../../../api/company';
import okResponse from '../../../utils/okResponse';
import CompanyFeaturesForm from './CompanyFeaturesForm';

export default function CompanySettings() {
  const [company, setCompany] = useState();
  const { user, isCompanyOwner } = useStore((state) => state, shallow);

  useEffect(() => {
    async function loadCompany() {
      const res = await getCompanyByOwnerId(user.id);

      if (okResponse(res) && res.data) {
        setCompany(res.data.company);
      } else {
        console.log(res);
      }
    }

    if (!company && user) {
      loadCompany();
    }
  }, [user, company]);

  return (
    <div className="settings-content__inner">
      <div className="settings-content__segment">
        <div className="settings-content__segment-body">
          <SettingsSectionHeader
            title="Company Details"
            subtitle="This section allows you to manage the basic details of your company"
          />
        </div>

        {isCompanyOwner() ? (
          <CompanyFormWrapper
            company={company}
            FormComponent={CompanyInfoForm}
          />
        ) : (
          <NoCompanyMessage />
        )}
      </div>

      {isCompanyOwner() && (
        <div className="settings-content__segment">
          <div className="settings-content__segment-body">
            <SettingsSectionHeader
              title="Company Settings"
              subtitle="This section allows you to manage company features"
            />
          </div>

          <CompanyFormWrapper
            company={company}
            FormComponent={CompanyFeaturesForm}
          />
        </div>
      )}
    </div>
  );
}
