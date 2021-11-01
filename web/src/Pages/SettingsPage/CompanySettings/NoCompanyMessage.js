import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button } from 'semantic-ui-react';
import { SettingsSectionSubHeader } from '../SettingsComponents';

export default function NoCompanyMessage() {
  return (
    <div className="settings-form__body">
      <div className="create-company__container">
        <FontAwesomeIcon
          className="settings-nav__icon"
          icon={faBuilding}
          size="3x"
        />

        <SettingsSectionSubHeader
          title="You don't have a company"
          subtitle="You can create a company below, please note you will be unable to make appointments as a company owner."
        />

        <Button primary onClick={() => alert('TODO')}>
          Create Company
        </Button>
      </div>
    </div>
  );
}
