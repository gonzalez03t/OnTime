import { em } from '..';
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

  const { companyName, imageUrl, fullAddress, subAddresses, companyPhone } =
    company;

  if (!companyName || !fullAddress || !companyPhone) {
    return null;
  }

  return new Company(
    user,
    companyName,
    imageUrl,
    fullAddress,
    companyPhone,
    subAddresses
  );
}
