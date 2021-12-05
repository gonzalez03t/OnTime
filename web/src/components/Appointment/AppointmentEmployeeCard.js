import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './AppointmentEmployeeCard.css';

export default function AppointmentEmployeeCard({
  firstName,
  lastName,
  email,
  phone,
  image,
  size,
}) {
  let style = {};
  let large = {
    height: '130px',
    width: '130px',
  };
  let Xlarge = {
    height: '150px',
    width: '150px',
  };

  if (size == 'large') style = large;
  else if (size == 'Xlarge') style = Xlarge;

  return (
    <div className="apt-employee-card__container">
      <div className="apt-employee-card__image-container" style={style}>
        {image ? (
          <img src={image} alt={`${firstName} Profile`} />
        ) : (
          <img src={"/User1.PNG"} alt={`${firstName} Profile`} />
        )}
      </div>

      <div className="apt-employee-card__info">
        <p>
          {firstName} {lastName}
        </p>

        <span>
          <FontAwesomeIcon icon={faPhone} />{' '}
          <a href={`tel:${phone}`}>{phone}</a>
        </span>

        <span style={{ marginTop: '0.5rem' }}>
          <FontAwesomeIcon icon={faEnvelope} />{' '}
          <a href={`mailto:${email}`}>{email}</a>
        </span>
      </div>
    </div>
  );
}
