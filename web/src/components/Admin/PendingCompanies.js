import React, { useEffect } from 'react';
import { Button, List, ListContent, ListItem } from 'semantic-ui-react';
import { getPendingCompanies, verifyCompany } from '../../api/company';
import useStore from '../../store/store';
import okResponse from '../../utils/okResponse';

export default function PendingCompanies() {
  const notify = useStore((state) => state.addNotification);
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

  const removeCompanyFromList = (id) => {
    setPendingCompanies((prev) => prev.filter((company) => company.id !== id));
  };

  const approveCompany = async (companyId) => {
    const res = await verifyCompany(companyId, 'VERIFIED');

    if (okResponse(res)) {
      removeCompanyFromList(companyId);
      notify('success', 'Company approved successfully');
    } else {
      console.log(res);
      notify('error', 'Error occurred while attempting to approve company');
    }
  };

  const rejectCompany = async (companyId) => {
    const res = await verifyCompany(companyId, 'DENIED');

    if (okResponse(res)) {
      removeCompanyFromList(companyId);
      notify('success', 'Company approved successfully');
    } else {
      console.log(res);
      notify('error', 'Error occurred while attempting to approve company');
    }
  };

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

              <div style={{ padding: '1rem 0' }}>
                <Button color="red" onClick={() => rejectCompany(company.id)}>
                  Reject
                </Button>

                <Button primary onClick={() => approveCompany(company.id)}>
                  Approve
                </Button>
              </div>
            </ListContent>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
