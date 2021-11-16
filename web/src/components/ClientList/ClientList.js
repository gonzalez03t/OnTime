import React, { useState } from 'react';
import { Container, List, Icon } from 'semantic-ui-react';
import ListAlert from '../CompanySearch/ListAlert';

export default function ClientList({ clients, click, filter, type }) {
  const clientList = [];

  if (clients.length === 0) {
    if (filter === '') {
      clientList.push(<div style={{ height: '50px' }}></div>);
    } else {
      clientList.push(<ListAlert type={type} />);
    }
  } else {
    clients.map((client, key) => {
      clientList.push(
        <List.Item key={key} onClick={() => click(client)}>
          <Icon name="user circle" size="big" />
          <List.Content>
            <List.Header as="a"> {client.text} </List.Header>
          </List.Content>
        </List.Item>
      );
    });
  }
  return (
    <Container>
      <List selection animated verticalAlign="middle" style={{ marginTop: 10 }}>
        {clientList}
      </List>
    </Container>
  );
  /*return (
    <List selection verticalAlign="middle">
      {clients?.slice(0, 10).map((client) => (
        <List.Item key={client.key} onClick={handleSelectedClient}>
          <Image avatar src={client.image || companyImage} />
          <List.Content>
            <List.Header as="a"> {client.text} </List.Header>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );*/
}
