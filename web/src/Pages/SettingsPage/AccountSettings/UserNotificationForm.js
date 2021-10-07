import React, { useState } from 'react';
import { Checkbox, Form } from 'semantic-ui-react';
import shallow from 'zustand/shallow';
import { updateUserNotificationPreference } from '../../../api/user';
import useStore from '../../../store/store';
import SettingsSectionSubHeader from '../SettingsComponents/SettingsSectionSubHeader';

export default function UserNotificationForm() {
  const { currentPreference, updateNotificationPreference } = useStore(
    (state) => ({
      currentPreference: state.getUserNotificationSetting(),
      updateNotificationPreference: state.setNotificationPreference,
    }),
    shallow
  );

  const [notificationPreference, setNotificationPreference] =
    useState(currentPreference);

  async function handleSave(e) {
    if (notificationPreference !== currentPreference) {
      const res = await updateUserNotificationPreference(
        notificationPreference
      );

      if (res?.status === 200) {
        updateNotificationPreference(notificationPreference);
      } else {
        console.log(res);
        alert('RUH ROH');
      }
    } else {
      alert('NO CHANGES');
    }
  }

  function handleChange(e, { value }) {
    setNotificationPreference(value);
  }

  return (
    <Form onSubmit={handleSave}>
      <div className="settings-form__body">
        <SettingsSectionSubHeader
          title="Push Notifications"
          subtitle="These are delivered via SMS to your mobile phone."
        />

        <Form.Field>
          <Checkbox
            radio
            label="Receive all notifications"
            name="checkboxRadioGroup"
            value="ALL"
            checked={notificationPreference === 'ALL'}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label="Receive appointment reminders only"
            name="checkboxRadioGroup"
            value="REMINDERS_ONLY"
            checked={notificationPreference === 'REMINDERS_ONLY'}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label="No push notifications"
            name="checkboxRadioGroup"
            value="NONE"
            checked={notificationPreference === 'NONE'}
            onChange={handleChange}
          />
        </Form.Field>
      </div>
      <div className="settings-form__actions">
        <Form.Button primary>Save</Form.Button>
      </div>
    </Form>
  );
}
