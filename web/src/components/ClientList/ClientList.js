import React from 'react';
import { List, Image } from 'semantic-ui-react';
import companyImage from '../../assets/company_placeholder.JPG';

export default function ClientList({ clients, handleSelectedClient }) {
  return (
    <List selection verticalAlign="middle">
      {clients?.slice(0, 10).map((client) => (
        <List.Item key={client.key} onClick={handleSelectedClient}>
          <Image avatar src={companyImage} />
          <List.Content>
            <List.Header as="a"> {client.text} </List.Header>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
}
