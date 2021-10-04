export const userFields = [
  [
    {
      name: 'firstName',
      label: 'First name:',
      placeholder: 'Bob',
      autoComplete: 'given-name',
      type: '',
      required: 'true',
    },
    {
      name: 'lastName',
      label: 'Last name:',
      placeholder: 'Burger',
      autoComplete: 'family-name',
      type: '',
      required: 'true',
    },
  ],
  [
    {
      name: 'password',
      label: 'Password:',
      placeholder: 'supersecurepassword',
      autoComplete: 'password',
      type: 'password',
      required: 'true',
    },
  ],
  [
    {
      name: 'email',
      label: 'Email address:',
      placeholder: 'somecoolname@gmail.com',
      autoComplete: 'email',
      width: '4',
      required: 'true',
    },
    {
      name: 'phone',
      label: 'Phone number:',
      placeholder: '555-555-5555',
      autoComplete: 'tel',
      type: 'tel',
      required: 'true',
    },
  ],
];

// Company: Name, Phone number, Main Address, Secondary Address, Status, Image url
export const ownerCompanyFields = [
  [
    {
      name: 'companyName',
      label: 'Company name:',
      placeholder: 'UF Health',
      autoComplete: 'company-name',
      type: 'company',
      required: 'true',
    },
    {
      name: 'companyPhone',
      label: 'Company phone number:',
      placeholder: '555-555-5555',
      autoComplete: 'tel',
      type: 'tel',
      required: 'true',
    },
  ],
  [
    {
      name: 'mainAddress',
      label: 'Main address:',
      placeholder: '9018 Jones St.',
      autoComplete: 'address',
      type: 'address',
      required: 'true',
    },
  ],
  [
    {
      name: 'city',
      label: 'City:',
      placeholder: 'Jacksonville',
      autoComplete: 'city',
      type: 'city',
      required: 'true',
    },
    {
      name: 'state',
      label: 'State:',
      placeholder: 'Florida',
      autoComplete: 'state',
      type: 'state',
      required: 'true',
    },
    {
      name: 'zipCode',
      label: 'Postal / zip code:',
      placeholder: '32250',
      autoComplete: 'zip-code',
      type: 'zip-code',
      required: 'true',
    },
  ],
  [
    {
      name: 'secondaryAddress',
      label: 'Secondary address:',
      placeholder: '9740 Cambridge St.',
      autoComplete: 'address',
      type: 'address',
      required: 'false',
    },
  ],
  [
    {
      name: 'secCity',
      label: 'City:',
      placeholder: 'Jacksonville',
      autoComplete: 'city',
      type: 'city',
      required: 'false',
    },
    {
      name: 'secState',
      label: 'State:',
      placeholder: 'Florida',
      autoComplete: 'state',
      type: 'state',
      required: 'false',
    },
    {
      name: 'secZipCode',
      label: 'Postal / zip code:',
      placeholder: '32250',
      autoComplete: 'zip-code',
      type: 'zip-code',
      required: 'false',
    },
  ],
  [
    {
      name: 'imageURL',
      label: 'Image url:',
      placeholder: 'https://ufhealth.com-1024x614.jpeg',
      autoComplete: '',
      type: '',
      required: 'false',
    },
  ],
];
