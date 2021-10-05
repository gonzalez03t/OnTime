import React from 'react';
import { Form } from 'semantic-ui-react';

export default function UserInformationForm() {
  function handleSave(e) {}

  return (
    <Form onSubmit={handleSave}>
      <div className="settings-form__body">
        <Form.Group widths="equal">
          <Form.Input label="First name" />
          <Form.Input label="Last name" />
        </Form.Group>

        <Form.Group>
          <Form.Input label="First name" />
        </Form.Group>
      </div>
      <div className="settings-form__actions">
        <Form.Button primary>Save</Form.Button>
      </div>
    </Form>
  );
}
