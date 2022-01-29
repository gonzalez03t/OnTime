import React from 'react';
import { Segment, Header, Card } from 'semantic-ui-react';
import CompanyCard from './CompanyCard';
import companyImage from '../../assets/company_placeholder.JPG';

export default function CompanyGroup(props) {
  const companyCards = props.companies.map((card) => (
    <CompanyCard
      image={companyImage}
      header={card.companyName}
      meta={card.companyIndustry}
      click={() => props.click(card.companyName)}
    />
  ));

  return (
    <Segment secondary padded raised>
      <Header as="h4">{props.title}</Header>
      <Card.Group>{companyCards}</Card.Group>
    </Segment>
  );
}
