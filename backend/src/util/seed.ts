import { em } from '..';
import { Company } from '../entities/Company';
import { User } from '../entities/User';

/**
 * This will populate the database with fake data
 */
export default async function seed() {
  console.log('*** SEEDING DATABASE ***');

  console.log('*** Creating users...');

  const base = em.create(User, {
    firstName: 'Base',
    lastName: 'User',
    email: 'base@gmail.com',
    phone: '1111111111',
    password: await User.generateHash('dev'),
  });

  const aaron = em.create(User, {
    firstName: 'Aaron',
    lastName: 'Leopold',
    email: 'aaronleopold1221@gmail.com',
    phone: '5616761089',
    password: await User.generateHash('dev'),
  });

  const jesus = em.create(User, {
    firstName: 'Jesus',
    lastName: 'Gonzalez',
    email: 'gonzalez03t@gmail.com',
    phone: '5555555555',
    password: await User.generateHash('dev'),
  });

  const emily = em.create(User, {
    firstName: 'Emily',
    lastName: 'Smemily',
    email: 'emilysmemily@gmail.com',
    phone: '1234567890',
    password: await User.generateHash('emily'),
  });

  const mary = em.create(User, {
    firstName: 'Mary',
    lastName: 'Good',
    email: 'mgood@med.hosp',
    phone: '1234567899',
    password: await User.generateHash('mary'),
  });

  await em
    .persistAndFlush([base, aaron, jesus, emily, mary])
    .then(() => console.log('*** Created all users!'))
    .catch((err) =>
      err.code === 11000
        ? console.log('*** Users already present in db')
        : console.log('*** Error creating users:', err)
    );

  console.log('*** Creating companies...');

  console.log('*** Setting jesus as owner of Playcare Daycare');

  const daycare = new Company(
    jesus,
    'Playcare Daycare',
    'https://images.unsplash.com/photo-1572059002053-8cc5ad2f4a38?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
    '1600 Amphitheatre Pkwy, Mountain View, CA 94043',
    '6502530000'
  );

  daycare.verifyCompany();

  jesus.makeCompanyOwner(daycare);

  console.log('*** Setting emily as employee of Playcare Daycare');

  // add as employee
  daycare.addEmployee(emily);

  // add work information
  emily.makeCompanyEmployee(daycare);

  console.log('*** Setting aaron as owner of UF Neurosurgery');

  const clinic = new Company(
    aaron,
    'UF Neurosurgery',
    'https://images.unsplash.com/photo-1572059002053-8cc5ad2f4a38?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
    '1505 SW Archer Rd, Gainesville, FL 32608',
    '3522739000'
  );

  clinic.verifyCompany();

  aaron.makeCompanyOwner(clinic);

  console.log('*** Setting mary as employee of Playcare Daycare');

  // add as employee
  clinic.addEmployee(mary);

  // add work information
  mary.makeCompanyEmployee(clinic);

  await em
    .persistAndFlush([daycare, clinic, aaron, jesus, emily, mary])
    .then(() => console.log('*** Created all companies!'))
    .catch((err) =>
      err.code === 11000
        ? console.log('*** Companies already present in db')
        : console.log('*** Error creating users:', err)
    );
}
