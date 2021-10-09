import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getCompanyByName } from '../../api/company';
import EmployeeCard from '../../components/EmployeeCardList/EmployeeCard/EmployeeCard';
import EmployeeList from '../../components/EmployeeCardList/EmployeeList';
import GoogleMaps from '../../components/MapComponent/GoogleMaps';
import Segment from '../../components/ui/Segment/Segment';

import './CompanyProfile.css';

export default function CompanyProfile() {
  const params = useParams();
  const [company, setCompany] = useState(null);

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
        <Segment.Header>
          <h3 className="title">Location</h3>
        </Segment.Header>

        <Segment.Spacer />

        <GoogleMaps />
      </Segment>
    </div>
  );
}
