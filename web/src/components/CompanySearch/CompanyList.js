import React from 'react';
import { Container, List, Image, Icon } from 'semantic-ui-react';
import companyImage from '../../assets/company_placeholder.JPG';
import ListAlert from './ListAlert';

export default function CompanyList(props) {
  const companyList = [];

  if (props.list.length === 0) {
    if (props.filter === '') {
      companyList.push(<div style={{ height: '50px' }}></div>);
    } else {
      companyList.push(<ListAlert type={props.type} />);
    }
  } else {
    props.list.map((company, key) => {
      companyList.push(
        <List.Item key={key} onClick={() => props.click(company)}>
          <Icon name="building" size="big" />
          <List.Content>
            <List.Header as="a"> {company.name} </List.Header>
          </List.Content>
        </List.Item>
      );
    });
  }

  return (
    <Container>
      <List selection animated verticalAlign="middle" style={{ marginTop: 10 }}>
        {companyList}
      </List>
    </Container>
  );
}
