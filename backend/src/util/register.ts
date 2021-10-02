import { em } from '..';
import { Company } from '../entities/Company';
import { User } from '../entities/User';

export async function registerCompanyOwnerUser(
  user: any
): Promise<User | null> {
  const { firstName, lastName, email, password, phone } = user;

  const existingUser = await em.findOne(User, {
    email,
  });

  if (existingUser) {
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

  const { name, imageUrl, fullAddress, subAddresses, phone } = company;

  if (!name || !fullAddress || !phone) {
    return null;
  }

  return new Company(user, name, imageUrl, fullAddress, phone, subAddresses);
}
