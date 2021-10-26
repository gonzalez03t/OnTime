export const userFields = [
  [
    {
      name: 'firstName',
      label: 'First name:',
      placeholder: 'Bob',
      autoComplete: 'given-name',
      type: '',
      required: true,
    },
    {
      name: 'lastName',
      label: 'Last name:',
      placeholder: 'Burger',
      autoComplete: 'family-name',
      type: '',
      required: true,
    },
  ],
  [
    {
      name: 'password',
      label: 'Password:',
      placeholder: 'supersecurepassword',
      autoComplete: 'password',
      type: 'password',
      required: true,
    },
  ],
  [
    {
      name: 'email',
      label: 'Email address:',
      placeholder: 'somecoolname@gmail.com',
      autoComplete: 'email',
      width: '4',
      required: true,
    },
    {
      name: 'phone',
      label: 'Your phone number:',
      placeholder: '555-555-5555',
      autoComplete: 'tel',
      type: 'tel',
      required: true,
    },
  ],
];

// Company: Name, Phone number, Main Address, Image url
export const ownerCompanyFields = [
  [
    {
      name: 'companyName',
      label: 'Company name:',
      placeholder: 'UF Health',
      autoComplete: 'company-name',
      type: 'company',
      required: true,
    },
    {
      name: 'companyPhone',
      label: 'Company phone number:',
      placeholder: '555-555-5555',
      autoComplete: 'tel',
      type: 'tel',
      required: true,
    },
  ],
  [
    {
      name: 'streetAddress',
      label: 'Street address:',
      placeholder: '9018 Jones St.',
      autoComplete: 'address',
      type: 'address',
      required: true,
    },
    {
      name: 'unit',
      label: 'Unit:',
      placeholder: 'APT 123',
      autoComplete: 'address',
      type: 'address',
      required: false,
    },
  ],

  [
    {
      name: 'city',
      label: 'City:',
      placeholder: 'Jacksonville',
      autoComplete: 'city',
      type: 'city',
      required: true,
    },
    {
      name: 'state',
      label: 'State:',
      placeholder: 'Florida',
      autoComplete: 'state',
      type: 'state',
      required: true,
    },
    {
      name: 'zipCode',
      label: 'Postal / zip code:',
      placeholder: '32250',
      autoComplete: 'zip-code',
      type: 'zip-code',
      required: true,
    }
  ]
];

export const countryOptions = [
  { key: 'United States', value: 'United States', text: 'United States' },
  { key: 'Canada', value: 'Canada', text: 'Canada' },
  { key: 'Afghanistan', value: 'Afghanistan', text: 'Afghanistan' },
  { key: 'Aland Islands', value: 'Aland Islands', text: 'Aland Islands' },
  { key: 'Albania', value: 'Albania', text: 'Albania' },
  { key: 'Algeria', value: 'Algeria', text: 'Algeria' },
  { key: 'American Samoa', value: 'American Samoa', text: 'American Samoa' },
  { key: 'Andorra', value: 'Andorra', text: 'Andorra' },
  { key: 'Angola', value: 'Angola', text: 'Angola' },
  { key: 'Anguilla', value: 'Anguilla', text: 'Anguilla' },
  { key: 'Antigua', value: 'Antigua', text: 'Antigua' },
  { key: 'Argentina', value: 'Argentina', text: 'Argentina' },
  { key: 'Armenia', value: 'Armenia', text: 'Armenia' },
  { key: 'Aruba', value: 'Aruba', text: 'Aruba' },
  { key: 'Australia', value: 'Australia', text: 'Australia' },
  { key: 'Austria', value: 'Austria', text: 'Austria' },
  { key: 'Azerbaijan', value: 'Azerbaijan', text: 'Azerbaijan' },
  { key: 'Bahamas', value: 'Bahamas', text: 'Bahamas' },
  { key: 'Bahrain', value: 'Bahrain', text: 'Bahrain' },
  { key: 'Bangladesh', value: 'Bangladesh', text: 'Bangladesh' },
  { key: 'Barbados', value: 'Barbados', text: 'Barbados' },
  { key: 'Belarus', value: 'Belarus', text: 'Belarus' },
  { key: 'Belgium', value: 'Belgium', text: 'Belgium' },
  { key: 'Belize', value: 'Belize', text: 'Belize' },
  { key: 'Benin', value: 'Benin', text: 'Benin' },
  { key: 'Bermuda', value: 'Bermuda', text: 'Bermuda' },
  { key: 'Bhutan', value: 'Bhutan', text: 'Bhutan' },
  { key: 'Brazil', value: 'Brazil', text: 'Brazil' },
  { key: 'Bulgaria', value: 'Bulgaria', text: 'Bulgaria' },
  { key: 'Chile', value: 'Chile', text: 'Chile' },
  { key: 'China', value: 'China', text: 'China' },
  { key: 'Colombia', value: 'Colombia', text: 'Colombia' },
  { key: 'Congo (the Democratic Republic of the)', value: 'Congo (the Democratic Republic of the)', text: 'Congo (the Democratic Republic of the)' },
  { key: 'Denmark', value: 'Denmark', text: 'Denmark' },
  { key: 'Ecuador', value: 'Ecuador', text: 'Ecuador' },
  { key: 'Egypt', value: 'Egypt', text: 'Egypt' },
  { key: 'France', value: 'France', text: 'France' },
  { key: 'French Guiana', value: 'French Guiana', text: 'French Guiana' },
  { key: 'Germany', value: 'Germany', text: 'Germany' },
  { key: 'Greece', value: 'Greece', text: 'Greece' },
  { key: 'Guatemala', value: 'Guatemala', text: 'Guatemala' },
  { key: 'Hong Kong', value: 'Hong Kong', text: 'Hong Kong' },
  { key: 'Hungary', value: 'Hungary', text: 'Hungary' },
  { key: 'India', value: 'India', text: 'India' },
  { key: 'Israel', value: 'Israel', text: 'Israel' },
  { key: 'Italy', value: 'Italy', text: 'Italy' },
  { key: 'Japan', value: 'Japan', text: 'Japan' },
  { key: 'Korea (the Republic of)', value: 'Korea (the Republic of)', text: 'Korea (the Republic of)' },
  { key: 'Lithuania', value: 'Lithuania', text: 'Lithuania' },
  { key: 'Luxembourg', value: 'Luxembourg', text: 'Luxembourg' },
  { key: 'Maldives', value: 'Maldives', text: 'Maldives' },
  { key: 'Mexico', value: 'Mexico', text: 'Mexico' },
  { key: 'Netherlands (the)', value: 'Netherlands (the)', text: 'Netherlands (the)' },
  { key: 'New Zealand', value: 'New Zealand', text: 'New Zealand' },
  { key: 'Norway', value: 'Norway', text: 'Norway' },
  { key: 'Oman', value: 'Oman', text: 'Oman' },
  { key: 'Pakistan', value: 'Pakistan', text: 'Pakistan' },
  { key: 'Panama', value: 'Panama', text: 'Panama' },
  { key: 'Poland', value: 'Poland', text: 'Poland' },
  { key: 'Romania', value: 'Romania', text: 'Romania' },
  { key: 'Russian Federation (the)', value: 'Russian Federation (the)', text: 'Russian Federation (the)' },
  { key: 'Saudi Arabia', value: 'Saudi Arabia', text: 'Saudi Arabia' },
  { key: 'Spain', value: 'Spain', text: 'Spain' },
  { key: 'Switzerland', value: 'Switzerland', text: 'Switzerland' },
  { key: 'Taiwan', value: 'Taiwan', text: 'Taiwan' },
  { key: 'Turkey', value: 'Turkey', text: 'Turkey' },
  { key: 'Ukraine', value: 'Ukraine', text: 'Ukraine' },
  { key: 'United Kingdom', value: 'United Kingdom', text: 'United Kingdom' },
  { key: 'Uruguay', value: 'Uruguay', text: 'Uruguay' },
  { key: 'Venezuela', value: 'Venezuela', text: 'Venezuela' },
  { key: 'Viet Nam', value: 'Viet Nam', text: 'Viet Nam' },
  { key: 'Western Sahara', value: 'Western Sahara', text: 'Western Sahara' },
  { key: 'Yemen', value: 'Yemen', text: 'Yemen' },
  { key: 'Zambia', value: 'Zambia', text: 'Zambia' }
]