import { em } from '..';
import { Company } from '../entities/Company';
import { User, UserRole } from '../entities/User';

/**
 * This will populate the database with fake data
 */
export default async function seed() {
  console.log('*** SEEDING DATABASE ***');

  console.log('*** Creating users...');
  // create dev account
  const aaron = em.create(User, {
    firstName: 'Aaron',
    lastName: 'Leopold',
    email: 'aaronleopold1221@gmail.com',
    phone: '5616761089',
    password: await User.generateHash('dev'),
    role: UserRole.ADMIN,
  });

  // const rodrigo = em.create(User, {
  //   firstName: 'Rodrigo',
  //   lastName: 'Lobo',
  //   email: '',
  //   phone: '',
  //   password: await User.generateHash('dev'),
  //   role: UserRole.ADMIN,
  // });

  // const jesus = em.create(User, {
  //   firstName: 'Rodrigo',
  //   lastName: 'Lobo',
  //   email: '',
  //   phone: '',
  //   password: await User.generateHash('dev'),
  //   role: UserRole.ADMIN,
  // });

  const emily = em.create(User, {
    firstName: 'Emily',
    lastName: 'Smemily',
    email: 'emilysmemily@gmail.com',
    phone: '1234567890',
    password: await User.generateHash('emily'),
    role: UserRole.EMPLOYEE,
  });

  await em
    .persistAndFlush([aaron, emily])
    .then(() => console.log('*** Created all users!'))
    .catch((err) =>
      err.code === 11000
        ? console.log('*** Users already present in db')
        : console.log('*** Error creating users:', err)
    );

  console.log('*** Creating companies...');

  const daycare = new Company(
    aaron,
    'Playcare Daycare',
    'https://images.unsplash.com/photo-1572059002053-8cc5ad2f4a38?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
    '1600 Amphitheatre Pkwy, Mountain View, CA 94043',
    '6502530000'
  );

  console.log('*** Setting emily as employee of Playcare Daycare');
  daycare.addEmployee(emily);
  emily.company = daycare;

  await em
    .persistAndFlush([daycare, emily])
    .then(() => console.log('*** Created all companies!'))
    .catch((err) =>
      err.code === 11000
        ? console.log('*** Companies already present in db')
        : console.log('*** Error creating users:', err)
    );
}
