import moment from 'moment';

function validateBirthDate(date) {
  const today = moment(new Date());
  const eighteen = moment().subtract(18, 'years');
  const oldie = moment().subtract(110, 'years');
  const bday = moment(date);

  // console.log({ today, eighteen, oldie, bday });

  if (!bday.isValid()) {
    return 'Invalid date entered';
  } else if (bday.isAfter(today)) {
    return 'You cannot enter a future date.';
  } else if (eighteen.isBefore(bday)) {
    return 'You are too young to register. You must be 18 years old to use OnTime.';
  } else if (bday.isBefore(oldie)) {
    return 'Invalid date entered';
  }
}

export function validateUserRegisterData(userDetails) {
  let errors = [];

  if (!userDetails) {
    errors.push('No user details were entered from the form');
    return errors;
  }

  const { dob } = userDetails;

  let dobError = validateBirthDate(dob);

  if (dobError) {
    errors.push(dobError);
  }

  return errors;
}
