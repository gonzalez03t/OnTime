const today = new Date();

function getStartDate(daysAway, hours, min) {
  const startsAt = new Date(Number(today));
  startsAt.setDate(today.getDate() + daysAway);
  startsAt.setHours(hours, min);

  return startsAt;
}

const baseUserPhoneNumbers = [
  '4558112413',
  '4036184650',
  '4567035978',
  '5477705061',
  '2657851191',
  '3685544053',
  '3278756130',
  '2955487198',
  '2779801927',
  '8277771397',
  '2857201685',
  '8658734410',
  '5272488667',
  '2308269232',
  '6265240235',
  '9259044191',
  '6559367030',
  '2898991985',
  '2115908302',
  '4896632737',
];

const employeePhoneNumbers = [
  '4447240092',
  '5183328251',
  '9615292886',
  '3169628081',
  '5356588933',
  '9346354849',
  '8353434971',
  '6492606640',
  '6198817274',
  '5096355247',
  '3603069073',
  '5993584538',
  '2053131981',
  '6726658500',
  '4893176547',
  '3886292629',
  '4962655034',
  '5229474080',
  '9523382904',
  '9659450537',
];

const companyOwnerPhoneNumbers = [
  '5603193733',
  '6382887857',
  '8289910087',
  '4968271618',
];

const companyPhoneNumbers = [
  '7577319126',
  '5144174518',
  '4859798668',
  '4106386929',
  // '3902494377',
  // '3477482705',
];

const baseUserNames = [
  'Base User', // main test account
  'September Hintz',
  'Golda Harder',
  'Lorine Elsea ',
  'Lashay Straughan',
  'Easter Saladino',
  'Naomi Adamson',
  'Jewel Maurice',
  'Jaquelyn Holtkamp',
  'Barbera Scogin',
  'Mara Bellin',
  'Loreen Quintero',
  'Lakendra Vanderpol',
  'Elvie Mcmann',
  'Syreeta Mullett',
  'Cecile Fujimoto',
  'Phylicia Mazza',
  'Leopoldo Kean',
  'Althea Wilkison',
  'Theron Talarico',
];

// bobs: 0-3, uf: 4-10, playcare: 11-14, nail: 15-19
const employeeNames = [
  'Linda Belcher', // bobs burger
  'Louise Belcher', // bobs burger
  'Tina Belcher', // bobs burger
  'Gene Belcher', // bobs burger
  'Pansy Quigley', // uf neuro
  'Bok Naslund', // uf neuro
  'Ed Brundidge', // uf neuro
  'Elke Saffell', // uf neuro
  'Deja Laureano', // uf neuro
  'Roxanne Rasch', // uf neuro
  'Jeraldine Haas', // uf neuro
  'Vannessa Moffit', // playcare
  'Ghislaine Stiver', // playcare
  'Dannie Trentham', // playcare
  'Danny Emond', // playcare
  'Benito Dreyer', // nail
  'Nelia Lunday', // nail
  'Bambi Cadwell', // nail
  'Fernande Southern', // nail
  'Malisa Backus', // nail
];

const companyOwnerNames = [
  'Bob Belcher',
  'Hannelore Poulson',
  'Chelsea Winchell',
  'Audie Baptist',
];

const adminNames = [];

const companies = [
  {
    name: "Bob's Burgers",
    // address: {},
    owner: 0, // index of owners
    employees: [0, 1, 2, 3], // index of empl,
    address: '506 US-46, Garfield, NJ 07026',
  },
  {
    name: 'UF Neurosurgery',
    // address: {},
    owner: 1, // index of owners
    employees: [4, 5, 6, 7, 8, 9, 10], // index of empl,
    address: '580 8th St W Tower I, 9th Floor, Jacksonville, FL 32209',
  },
  {
    name: 'Playcare Daycare',
    // address: {},
    owner: 2, // index of owners
    employees: [11, 12, 13, 14], // index of empl,
    address: '1935 E Fort Lowell Rd, Tucson, AZ 85719',
  },
  {
    name: 'Sail Away Nail Co.',
    // address: {},
    owner: 3, // index of owners
    employees: [15, 16, 17, 18, 19], // index of empl,
    address: '7931 N Oracle Rd, Oro Valley, AZ 85704',
  },
];

// {user: appointments} => {user: [{company, empl, time}, {company, empl, time}]}
const appointments = [
  {
    clientIndex: 0,
    appointments: [
      // BORGER APPOINTMENTS
      {
        company: 0,
        employee: 0,
        startsAt: getStartDate(0, 12, 30),
      },
      {
        company: 0,
        employee: 1,
        startsAt: getStartDate(2, 12, 30),
      },

      // UF HEALTH APPOINTMENTS
      {
        company: 1,
        employee: 5,
        startsAt: getStartDate(0, 7, 45),
      },

      {
        company: 1,
        employee: 5,
        startsAt: getStartDate(0, 10, 30),
      },
      {
        company: 1,
        employee: 5,
        startsAt: getStartDate(0, 8, 45),
      },
      {
        company: 1,
        employee: 5,
        startsAt: getStartDate(0, 15, 45),
      },
      {
        company: 1,
        employee: 5,
        startsAt: getStartDate(0, 17, 0),
      },
      {
        company: 1,
        employee: 5,
        startsAt: getStartDate(7, 15, 45),
      },
      {
        company: 1,
        employee: 5,
        startsAt: getStartDate(14, 15, 45),
      },

      // DAYCARE APPOINTMENTS
      {
        company: 2,
        employee: 12,
        startsAt: getStartDate(1, 10, 30),
      },
      {
        company: 2,
        employee: 12,
        startsAt: getStartDate(2, 10, 30),
      },

      // NAIL APPOINTMENTS
      {
        company: 2,
        employee: 19,
        startsAt: getStartDate(5, 11, 30),
      },
      {
        company: 2,
        employee: 19,
        startsAt: getStartDate(15, 11, 30),
      },
      {
        company: 2,
        employee: 19,
        startsAt: getStartDate(25, 11, 30),
      },
    ],
  },
];

export const seedData = {
  baseUserPhoneNumbers,
  employeePhoneNumbers,
  companyOwnerPhoneNumbers,
  companyPhoneNumbers,

  baseUserNames,
  employeeNames,
  companyOwnerNames,
  adminNames,
  companies,

  appointments,
};
