export const userFields = [
  [
    {
      name: "First Name:",
      placeholder: "Bob",
      autoComplete: "given-name",
      type: "",
      required: "true"
    },
    {
      name: "Last Name:",
      placeholder: "Burger",
      autoComplete: "family-name",
      type: "",
      required: "true"
    },
  ],
  [
    {
      name: "Password:",
      placeholder: "supersecurepassword",
      autoComplete: "password",
      type: "password",
      required: "true"
    },
  ],
  [
    {
      name: "Email address:",
      placeholder: "somecoolname@gmail.com",
      autoComplete: "email",
      width: "4",
      required: "true"
    },
    {
      name: "Phone number:",
      placeholder: "555-555-5555",
      autoComplete: "tel",
      type: "tel",
      required: "true"
    },
  ]
];

// Employee: company name, role
export const employeeCompanyFields = [
  [
    {
      name: "Company name:",
      placeholder: "UF Health",
      autoComplete: "company-name",
      type: "company",
      required: "true"
    }, 
    {
      name: "Role:",
      placeholder: "Secretary",
      autoComplete: "role",
      type: "role",
      required: "false"
    }
  ]
];

// Company: Name, Phone number, Main Address, Secondary Address, Status, Image url
export const ownerCompanyFields = [
  [
    {
      name: "Company name:",
      placeholder: "UF Health",
      autoComplete: "company-name",
      type: "company",
      required: "true"
    },
    {
      name: "Company phone number:",
      placeholder: "555-555-5555",
      autoComplete: "tel",
      type: "tel",
      required: "true"
    },
  ],
  [
    {
      name: "Main address:",
      placeholder: "9018 Jones St.",
      autoComplete: "address",
      type: "address",
      required: "true"
    }
  ],
  [
    {
      name: "City:",
      placeholder: "Jacksonville",
      autoComplete: "city",
      type: "city",
      required: "true"
    },
    {
      name: "State:",
      placeholder: "Florida",
      autoComplete: "state",
      type: "state",
      required: "true"
    },
    {
      name: "Postal / Zip Code:",
      placeholder: "32250",
      autoComplete: "zip-code",
      type: "zip-code",
      required: "true"
    }
  ],
  [
    {
      name: "Secondary address:",
      placeholder: "9740 Cambridge St.",
      autoComplete: "address",
      type: "address",
      required: "false"
    }
  ],
  [
    {
      name: "City:",
      placeholder: "Jacksonville",
      autoComplete: "city",
      type: "city",
      required: "false"
    },
    {
      name: "State:",
      placeholder: "Florida",
      autoComplete: "state",
      type: "state",
      required: "false"
    },
    {
      name: "Postal / Zip Code:",
      placeholder: "32250",
      autoComplete: "zip-code",
      type: "zip-code",
      required: "false"
    }
  ],
  [
    {
      name: "Image URL:",
      placeholder: "https://ufhealth.com-1024x614.jpeg",
      autoComplete: "",
      type: "",
      required: "false"
    }
  ]
];