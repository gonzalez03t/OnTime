import React, { useState } from 'react';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'semantic-ui-react';
import { SettingsSectionSubHeader } from '../../SettingsComponents';
import CompanyRegisterForm from './CompanyRegisterForm';

export default function CreateCompanyUnavailable() {
  const [clicked, setClicked] = useState(false);

  function showForm() {
    setClicked(true);
  }

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

        {!clicked ? (
          <Button primary onClick={showForm}>
            Create Company
          </Button>
        ) : null}

        {clicked ? <CompanyRegisterForm /> : null}
      </div>
    </div>
  );
}
