import { PasswordStrength } from 'tai-password-strength';

const WEAK_CODES = ['VERY_WEAK', 'WEAK'];
const tester = new PasswordStrength();

// TODO: remove short circuit
export default function isWeakPassword(password) {
  return false;
  const results = tester.check(password);

  console.log(results);

  return WEAK_CODES.includes(results?.strengthCode);
}
