import { em } from '..';
import Address from '../entities/Address';
import { Company } from '../entities/Company';
import { User } from '../entities/User';

// TODO: refactor these to return errors, not null

export async function registerCompanyOwnerUser(
  user: any
): Promise<User | null> {
  const { firstName, lastName, email, password, phone } = user;

  const existingUser = await em.findOne(User, {
    email,
  });

  if (existingUser) {
    console.log('user already exists');
    return null;
  } else {
    return em.create(User, {
      firstName,
      lastName,
      email,
      phone,
      password: await User.generateHash(password),
    });
  }
}

export async function registerCompanyOwnerCompany(
  user: User | null,
  company: any
): Promise<Company | null> {
  if (!user) {
    return null;
  }

  const { companyName, address: rawAddress, companyPhone } = company;
  // const { companyName, imageUrl, address, subAddresses, companyPhone } =
  // company;

  if (!companyName || !rawAddress || !companyPhone) {
    return null;
  }

  const { street, unit, city, stateProvince, postalCode, country } = rawAddress;

  const address = new Address(
    street,
    city,
    stateProvince,
    postalCode,
    country,
    unit
  );

  return em.create(Company, {
    owner: user,
    name: companyName,
    phone: companyPhone,
    address,
  });
}
