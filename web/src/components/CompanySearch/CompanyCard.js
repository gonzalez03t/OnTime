import React from 'react';
import { Card } from 'semantic-ui-react';

export default function CompanyCards(props) {
  return (
    <Card
      image={props.image}
      header={props.header}
      meta={props.meta}
      as="a"
      onClick={() => props.click()}
    />
  );
}
