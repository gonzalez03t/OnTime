import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation } from 'react-router';

import { getCompanyByName } from '../../api/company';
import EmployeeList from '../../components/EmployeeCardList/EmployeeList';
import GoogleMaps from '../../components/MapComponent/GoogleMaps';
import Segment from '../../components/ui/Segment/Segment';
import AppointmentScheduler from '../../components/Appointment/AppointmentScheduler';
import scrollToComponent from 'react-scroll-to-component';

import './CompanyProfile.css';

export default function CompanyProfile() {
  const params = useParams();
  const { state } = useLocation();
  const [company, setCompany] = useState(null);
  const schedulingRef = useRef(null);

  useEffect(() => {
    async function fetchCompany(name) {
      const res = await getCompanyByName(name);

      if (res?.status === 200 && res?.data) {
        setCompany(res.data.company);
      }
    }

    if (!params.name) {
      throw new Error('Woah this needs to be handled');
    } else if (!company || company.name !== params.name) {
      fetchCompany(params.name);
    }
  }, [params.name]);

  useEffect(() => {
    if (schedulingRef && state?.scheduling) {
      scrollToComponent(schedulingRef.current, {
        offset: 100,
        align: 'top',
        duration: 1500,
      });
    }
  }, [schedulingRef.current, state]);

  function getCoverImageStyle() {
    let baseStyles = {
      minHeight: '12rem',
      position: 'relative',
      marginBottom: '0.5rem',
    };

    if (company?.image) {
    } else {
      return { ...baseStyles, backgroundColor: '#D1D5DB' };
    }

    return null;
  }

  return (
    <div>
      <Segment>
        <div style={getCoverImageStyle()}>
          <div className="company-logo__container">
            {company?.logo ? (
              <img src={company.logo} alt={`${company.name} Logo`} />
            ) : (
              <svg
                className="company-logo__placeholder"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </div>
        </div>
        <Segment.Header>
          <h3 className="title">{company?.name}</h3>
          <p className="subtitle">company info....</p>
        </Segment.Header>
        <Segment.Spacer />
      </Segment>

      <Segment>
        <Segment.Header>
          <h3 className="title">Overview</h3>
          <p className="subtitle">company overview definition...</p>
        </Segment.Header>

        <Segment.Body>TODO</Segment.Body>
      </Segment>

      <Segment>
        <Segment.Header>
          <h3 className="title">Employees</h3>
          <p className="subtitle">
            Take a look at some of our wonderful people
          </p>
        </Segment.Header>

        <Segment.Body>
          <EmployeeList employees={company?.employees} />
        </Segment.Body>
      </Segment>

      <Segment>
        {/* <Element name="scheduling" /> */}

        <div ref={schedulingRef} id="scheduling" />

        <Segment.Header>
          <h3 className="title">Schedule an Appointment</h3>
          <p className="subtitle">
            Select an employee to see what works within their schedule
          </p>
        </Segment.Header>

        <Segment.Body>
          <AppointmentScheduler
            company={company}
            employees={company?.employees}
          />
        </Segment.Body>
      </Segment>

      <Segment>
        <Segment.Header>
          <h3 className="title">Location</h3>
          <p className="subtitle">{company?.fullAddress}</p>
        </Segment.Header>

        <Segment.Spacer />

        {/* <GoogleMaps fullAddress="University of Florida, Gainesville, FL 32611" /> */}
        {company?.fullAddress && (
          <GoogleMaps fullAddress={company.fullAddress} />
        )}
      </Segment>
    </div>
  );
}
