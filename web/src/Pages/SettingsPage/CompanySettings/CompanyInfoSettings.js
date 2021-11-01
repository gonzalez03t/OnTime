import React, { useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react';
import shallow from 'zustand/shallow';
import { getCompanyByOwnerId } from '../../../api/company';
import useStore from '../../../store/store';
import okResponse from '../../../utils/okResponse';
import CompanyInfoForm from './CompanyInfoForm';

export default function CompanyInfoSettings() {
  const [company, setCompany] = useState();
  const { user } = useStore((state) => state, shallow);

  useEffect(() => {
    async function loadCompany() {
      const res = await getCompanyByOwnerId(user.id);

      if (okResponse(res) && res.data) {
        setCompany(res.data.company);
      } else {
        console.log(res);
      }
    }

    if (!company && user) {
      loadCompany();
    }
  }, [user, company]);

  if (company) {
    return <CompanyInfoForm company={company} />;
  }

  return <Loader active />;
}
