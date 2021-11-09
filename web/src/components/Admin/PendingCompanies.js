import React, { useEffect } from 'react';
import { List, ListContent, ListItem } from 'semantic-ui-react';
import { getPendingCompanies } from '../../api/company';
import okResponse from '../../utils/okResponse';

export default function PendingCompanies() {
  const [pendingCompanies, setPendingCompanies] = React.useState();

  useEffect(() => {
    async function loadCompanies() {
      const res = await getPendingCompanies();

      // console.log(res);
      if (okResponse(res) && res.data) {
        setPendingCompanies(res.data);
      }
    }

    if (!pendingCompanies) {
      loadCompanies();
    }
  }, []);

  return (
    <div>
      <h3>Pending Companies</h3>
      <List>
        {pendingCompanies?.map((company) => (
          <ListItem key={company.id}>
            <ListContent>
              <List.Header>{company.name}</List.Header>
              <List.Description>ID: {company.id}</List.Description>

              <List.Description>
                Profile Photo:
                {company.imageKey ? (
                  <img src={company.imageKey} alt="profile" />
                ) : (
                  ' None'
                )}
              </List.Description>

              <List.Description>
                Cover Photo:
                {company.imageKey ? (
                  <img src={company.coverImageKey} alt="profile" />
                ) : (
                  ' None'
                )}
              </List.Description>

              <List.Description>
                Creator Information:
                <pre>
                  {'    '}Name: {company.owner?.firstName}{' '}
                  {company.owner?.lastName}
                  <br />
                  {'    '}Email: {company.owner?.email}
                  <br />
                  {'    '}Phone: {company.owner?.phone}
                </pre>
              </List.Description>
              <List.Description>
                Address: {company.fullAddress}
              </List.Description>
              <List.Description>
                Date Created: {company.createdAt} (TODO: format me)
              </List.Description>
            </ListContent>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
