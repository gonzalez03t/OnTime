import React from 'react';
import { useHistory } from 'react-router';
import { Header, Modal, Image, Button } from 'semantic-ui-react';
import companyImage from '../../assets/company_placeholder.JPG';
import { Link } from 'react-router-dom';

export default function CompanyModal(props) {
  const history = useHistory();

  const companyRoute = '/company/' + props.company.name;

  const handleScheduleClick = () => {
    props.closeModal(false);
    history.push(companyRoute, { scheduling: true });
  };

  return (
    <Modal
      onClose={() => props.closeModal(false)}
      onOpen={() => props.openModal(true)}
      open={props.isOpen}
    >
      <Modal.Content image>
        <Image size="medium" src={companyImage} wrapped />
        <Modal.Description>
          <Header>{props.company.name}</Header>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor.
          </p>
          <h5>{props.company.phone}</h5>
          <p>{props.company.fullAddress}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="More Details"
          labelPosition="right"
          icon="plus"
          onClick={() => props.closeModal(false)}
          positive
          as={Link}
          to={companyRoute}
        />
        <Button
          content="Schedule an Appointment"
          labelPosition="right"
          icon="checkmark"
          onClick={handleScheduleClick}
          positive
          // as={Link}
          // to={companySchedule}
        />
      </Modal.Actions>
    </Modal>
  );
}
