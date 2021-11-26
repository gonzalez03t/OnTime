import React from 'react';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'semantic-ui-react';
import { SettingsSectionSubHeader } from '../../SettingsComponents';

export default function CreateCompanyUnavailable() {
  return (
    <div className="settings-form__body">
      <div className="create-company__container">
        <FontAwesomeIcon
          className="settings-nav__icon"
          icon={faBuilding}
          size="3x"
        />

        <SettingsSectionSubHeader
          title="You are not eligible to create a company"
          subtitle="You must first cancel all future appointments, please note you will be unable to make appointments as a company owner."
        />
      </div>
    </div>
  );
}
