import React from 'react';
import { Loader } from 'semantic-ui-react';

// this function basically just renders the loader until the company is loaded,
// then renders the react component passed in as FormComponent
export default function CompanyFormWrapper({ company, FormComponent }) {
  if (company) {
    return <FormComponent company={company} />;
  }

  return <Loader active />;
}
