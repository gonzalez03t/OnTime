import { EntityManager } from '@mikro-orm/core';
import { User } from '../entities/User';

// TODO: make me
/**
 * This will populate the database with fake data
 *
 * @param _em the MikroORM Entity Manager Instance
 */
export default async function seed(em: EntityManager) {
  // create dev account
  const dev = em.create(User, {
    firstName: 'Dev',
    lastName: 'Eloper',
    email: 'dev@gmail.com',
    phone: '5555555555',
    password: User.generateHash('supersecurepassword'),
  });

  await em.persistAndFlush([dev]);
}
