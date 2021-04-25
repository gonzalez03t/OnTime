import path from 'path';

// I am requiring this again because index.ts does not import this file directly
// so it sometimes doesn't load the env vars itself
require('dotenv').config({ path: path.join(__dirname, '../../../../.env') });

const twilioConfig = {
  accountSid: process.env.TWILIO_ACCOUNT_SID!,
  authToken: process.env.TWILIO_ACCESS_TOKEN!,
  phoneNumber: process.env.TWILIO_PHONE_NUMBER!,
};

export default twilioConfig;
