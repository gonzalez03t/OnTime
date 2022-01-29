import React, { useState } from 'react';
import { Form, Input } from 'semantic-ui-react';
import { updateCompanySettings } from '../../../api/company';
import useToggle from '../../../hooks/useToggle';
import useStore from '../../../store/store';
import okResponse from '../../../utils/okResponse';

// TODO: other form items
export default function CompanyFeaturesForm({ company }) {
  const notify = useStore((state) => state.addNotification);

  const [loading, { on, off }] = useToggle(false);
  const [newFeatures, setNewFeatures] = useState(company);

  const handleSave = async () => {
    on();

    const res = await updateCompanySettings(company.id, {
      maxBodyCount: newFeatures.maxBodyCount
        ? parseInt(newFeatures.maxBodyCount)
        : undefined,
      employeeTitle: newFeatures.employeeTitle,
      appointmentDuration: newFeatures.appointmentDuration
        ? parseInt(newFeatures.appointmentDuration)
        : undefined,
    });

    off();

    if (!okResponse(res)) {
      console.log(res);
      notify('error', 'Error updating company settings');
    } else {
      notify('success', 'Company settings updated');
    }
  };

  const handleChange = (e, { name, value }) => {
    setNewFeatures({ ...newFeatures, [name]: value });
  };

  return (
    <Form onSubmit={handleSave}>
      <div className="settings-form__body">
        <Form.Group widths="equal">
          <Form.Field>
            <label htmlFor="maxBodyCount" style={{ margin: 0 }}>
              Max Body Count
            </label>
            <p className="form-label-sub" style={{ margin: '0 0 0.25rem 0' }}>
              The maximum number of clients that can be present at any given
              time during working hours. Blank or 0 means there is no limit.
            </p>
            <Input
              name="maxBodyCount"
              value={newFeatures?.maxBodyCount}
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field>
            <label htmlFor="employeeTitle" style={{ margin: 0 }}>
              Employee Title
            </label>
            <p className="form-label-sub" style={{ margin: '0 0 0.25rem 0' }}>
              This is what will be displayed on the employee's profile when
              client's make appointments
            </p>
            <Input
              name="employeeTitle"
              value={newFeatures?.employeeTitle}
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field>
            <label htmlFor="appointmentDuration" style={{ margin: 0 }}>
              Appointment Duration
            </label>
            <p className="form-label-sub" style={{ margin: '0 0 0.25rem 0' }}>
              Employee's schedules will be divided into blocks of this length in
              MINUTES. Default is 60 minutes.
            </p>
            <Input
              name="appointmentDuration"
              value={newFeatures?.appointmentDuration}
              onChange={handleChange}
            />
          </Form.Field>
        </Form.Group>
      </div>
      <div className="settings-form__actions">
        <Form.Button primary loading={loading}>
          Save
        </Form.Button>
      </div>
    </Form>
  );
}
