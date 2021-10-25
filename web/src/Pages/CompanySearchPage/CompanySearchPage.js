import React, { useState } from 'react';
import { Container } from 'semantic-ui-react';
import SearchBar from '../../components/CompanySearch/SearchBar';
import CompanyGroup from '../../components/CompanySearch/CompanyGroup';
import tempCompanies from '../../assets/tempCompanies';
import CompanyModal from '../../components/modals/CompanyModal';

export default function CompanySearch() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState({});

  const handleListClick = (company) => {
    // Launch modal with company info
    setOpenModal(true);
    setSelectedCompany(company);
  };

  const handleCardClick = (company) => {
    alert('TODO: Backend logic for favorited and popular companies.');

    // Launch modal with company info
    setOpenModal(true);
    setSelectedCompany(company);
  };

  // PENDING: Query favorited companies
  const favoriteCompanies = tempCompanies.slice(0, 2);

  // PENDING: Query popular companies
  const popularCompanies = tempCompanies.slice(0, 3);

  return (
    <Container style={{ marginTop: 100 }}>
      <SearchBar click={(company) => handleListClick(company)} />
      <CompanyGroup
        title="Favorited Companies"
        companies={favoriteCompanies}
        click={(company) => handleCardClick(company)}
      />
      <CompanyGroup
        title="Popular by Industry"
        companies={popularCompanies}
        click={(company) => handleCardClick(company)}
      />

      <CompanyModal
        isOpen={openModal}
        company={selectedCompany}
        openModal={(val) => setOpenModal(val)}
        closeModal={(val) => setOpenModal(val)}
      />
    </Container>
  );
}
