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
}) {
  return (
    <div className="apt-employee-card__container">
      <div className="apt-employee-card__image-container">
        {image ? (
          <img src={image} alt={`${firstName} Profile`} />
        ) : (
          <svg
            className="user-image__placeholder"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
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
