import React, { useState, useEffect } from 'react';
import { Container, Header, Input } from 'semantic-ui-react';
import CompanyList from './CompanyList';

import { getCompanies } from '../../api/company';

export default function SearchBar(props) {
  const [comps, setComps] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [searchReturn, setSearchReturn] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getCompanies();
      setComps(response.data);
      return response;
    }
    fetchData();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchReturn(
        comps.filter((val) => {
          if (searchFilter === '') {
            return null;
          } else if (
            val.name.toLowerCase().includes(searchFilter.toLowerCase())
          ) {
            return val;
          }
        })
      );
    }, 700);
    return () => clearTimeout(timeoutId);
  }, [searchFilter]);

  const handleChange = (value) => {
    setSearchFilter(value);
  };

  // Return only first five results
  if (searchReturn.length > 5) {
    setSearchReturn(searchReturn.slice(0, 5));
  }

  // Handle company click
  const handleClick = (company) => {
    setSearchFilter(company.name);
    props.click(company);
  };

  return (
    <Container>
      <Header as="h3">Search for Company</Header>
      <Input
        fluid
        size="large"
        placeholder="Company name..."
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        value={searchFilter}
      />
      <CompanyList
        list={searchReturn}
        click={(company) => handleClick(company)}
        filter={searchFilter}
      />
    </Container>
  );
}
