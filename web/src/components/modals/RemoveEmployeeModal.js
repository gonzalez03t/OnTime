import React from 'react';
import { Button, Modal, Header } from 'semantic-ui-react';

export default function RemoveEmployeeModal({
  open,
  onClose,
  handleRemove,
  loading,
  employee,
}) {
  return (
    <React.Fragment>
      <Modal open={open} size="tiny" onClose={onClose}>
        <Modal.Content>
          <Header as="h3">Remove Employee</Header>
          <p>
            Are you sure you want to remove{' '}
            <strong>
              {employee?.lastName}, {employee?.firstName}
            </strong>{' '}
            from your employee list?
          </p>
          <p>
            The employee will no longer be available for appointment scheduling.{' '}
          </p>
        </Modal.Content>
        <Modal.Actions large>
          <Button primary onClick={onClose} loading={loading}>
            {' '}
            No{' '}
          </Button>
          <Button negative onClick={handleRemove} loading={loading}>
            {' '}
            Yes{' '}
          </Button>
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  );
}
