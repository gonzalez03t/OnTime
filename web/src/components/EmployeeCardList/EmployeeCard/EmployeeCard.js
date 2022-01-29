import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './EmployeeCard.css';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

export default function EmployeeCard({
  firstName,
  lastName,
  email,
  phone,
  image,
}) {
  return (
    <div className="employee-card__container">
      <div className="employee-card__body">
        <div className="employee-card__image-container">
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

        <div className="employee-card__info">
          <p>
            {firstName} {lastName}
          </p>
        </div>
      </div>
      <div className="employee-card__footer">
        <div className="employee-card__btn email" onClick={() => alert('TODO')}>
          <FontAwesomeIcon icon={faEnvelope} />
          <span>Email</span>
        </div>
        <div className="employee-card__btn call" onClick={() => alert('TODO')}>
          <FontAwesomeIcon icon={faPhone} />
          <span>Call</span>
        </div>
      </div>
    </div>
  );
}
