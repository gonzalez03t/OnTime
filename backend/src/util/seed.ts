import { em } from '..';
import { VerificationStatus } from '../../@types/enums';
import Address from '../entities/Address';
import { Appointment } from '../entities/Appointment';
import { Company } from '../entities/Company';
import { Reminder } from '../entities/Reminder';
import { User, UserRole } from '../entities/User';
import { seedData } from './seedData';

async function generateUsers(role: UserRole): Promise<User[]> {
  let userList, phoneList;

  if (role === UserRole.COMPANY_OWNER) {
    userList = seedData.companyOwnerNames;
    phoneList = seedData.companyOwnerPhoneNumbers;
  } else if (role === UserRole.EMPLOYEE) {
    userList = seedData.employeeNames;
    phoneList = seedData.employeePhoneNumbers;
  } else {
    userList = seedData.baseUserNames;
    phoneList = seedData.baseUserPhoneNumbers;
  }

  const users: User[] = [];

  for (let i = 0; i < userList.length; i++) {
    const p = userList[i];

    const names = p.split(' ');

    const firstName = names[0];
    const lastName = names[1];
    const email = `${lastName}.${firstName}@gmail.com`.toLowerCase();
    const phone = phoneList[i];

    users.push(
      em.create(User, {
        firstName,
        lastName,
        email,
        phone,
        password: await User.generateHash('password'),
        role,
      })
    );
  }

  return em.persistAndFlush(users).then(() => users);
}

function generateCompanies(companyOwners: User[], employeeUsers: User[]) {
  let companies: Company[] = [];

  for (let i = 0; i < seedData.companies.length; i++) {
    const c = seedData.companies[i];

    const { name, address: rawAddress } = c;

    const companyOwner = companyOwners[c.owner];
    const employees = c.employees.map((i) => employeeUsers[i]);
    const phone = seedData.companyPhoneNumbers[i];

    const { street, unit, city, stateProvince, postalCode, country } =
      rawAddress;

    const address = new Address(
      street,
      city,
      stateProvince,
      postalCode,
      country,
      unit
    );

    const company = em.create(Company, {
      name,
      phone,
      owner: companyOwner,
      address,
      status: VerificationStatus.VERIFIED,
    });

    for (const empl of employees) {
      company.addEmployee(empl);
    }

    em.persist([company, ...employees]);

    companies.push(company);
  }

  return em.flush().then(() => companies);
}

async function generateAdmin() {
  return em.persistAndFlush(
    em.create(User, {
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@ontime.com',
      password: await User.generateHash('admin'),
      phone: '09876542',
      role: UserRole.ADMIN,
    })
  );
}

/**
 * This will populate the database with fake data. Added forceIgnore param so the process is
 * more controlled during development if I don't want to consistently build/destory the db
 */
export default async function seed(forceIgnore = false) {
  if (forceIgnore) {
    console.log('*** SKIPPING SEED PROCESS ***');
    return;
  }

  console.log('*** CLEARING DATABASE ***');
  await em.getDriver().nativeDelete('User', {});
  await em.getDriver().nativeDelete('Appointment', {});
  await em.getDriver().nativeDelete('Reminder', {});
  await em.getDriver().nativeDelete('Company', {});
  await em.getDriver().nativeDelete('Token', {});
  console.log('*** DATABASE CLEARED AND READY TO SEED ***');

  console.log('*** SEEDING DATABASE ***');

  console.log('*** CREATING BASE USERS');
  const baseUsers = await generateUsers(UserRole.BASE);
  console.log('*** BASE USERS CREATED');

  console.log('*** CREATING EMPLOYEE USERS');
  const employeeUsers = await generateUsers(UserRole.EMPLOYEE);
  console.log('*** EMPLOYEE USERS CREATED');

  console.log('*** CREATING COMPANY_OWNER USERS');
  const companyOwners = await generateUsers(UserRole.COMPANY_OWNER);
  console.log('*** COMPANY_OWNER USERS CREATED');

  console.log('*** CREATING ADMIN USER');
  await generateAdmin();
  console.log('*** ADMIN USER CREATED');

  console.log('*** CREATING COMPANIES');
  const companies = await generateCompanies(companyOwners, employeeUsers);
  console.log('*** COMPANIES CREATED');

  console.log('*** CREATING APPOINTMENTS');
  for (const { clientIndex, appointments } of seedData.appointments) {
    const client = baseUsers[clientIndex];

    for (const a of appointments) {
      const company = companies[a.company];
      const employee = employeeUsers[a.employee];

      const clientAppointment = em.create(Appointment, {
        client,
        employee,
        company,
        startsAt: a.startsAt,
      });

      clientAppointment.reminders.add(
        em.create(Reminder, {
          remindAt: clientAppointment.getDefaultReminderTime(),
        })
      );

      em.persist(clientAppointment);
    }
  }
  await em.flush();
  console.log('*** APPOINTMENTS CREATED');

  console.log('*** DATABASE SEEDED ***');
}
