import React, { useEffect, useState } from 'react';
import { SettingsSectionHeader } from '../../SettingsComponents';
import { hasFutureAppointments } from '../../../../api/user';
import CreateCompanyAvailable from './CreateCompanyAvailable';
import CreateCompanyUnavailable from './CreateCompanyUnavailable';

export default function NoCompanyMessage() {
  const [form, setForm] = useState('unavailable');

  function getFormOption() {
    return form == 'unavailable' ? (
      <CreateCompanyUnavailable />
    ) : (
      <CreateCompanyAvailable />
    );
  }

  useEffect(() => {
    async function getForm() {
      const res = await hasFutureAppointments();

      if (res) {
        if (res.data) {
          setForm('unavailable');
        } else {
          setForm('available');
        }
      }
    }
    getForm();
  });

  return <div>{getFormOption()}</div>;
}
