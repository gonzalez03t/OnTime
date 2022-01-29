import Twilio from 'twilio';
import twilioConfig from '../config/twilio';

/**
 * This function will use twilio to send an SMS message to remind a client
 * about an upcoming appointment.
 *
 * @param message the preformatted message string to text
 * @param to the phone number to send the message to
 */
export default async function sendSms(message: string, to: string) {
  const { accountSid, authToken, phoneNumber } = twilioConfig;

  const client = Twilio(accountSid, authToken);

  const options = {
    to: `+1 ${to}`,
    from: `+1 ${phoneNumber}`,
    body: message,
  };

  // Send the message!
  client.messages.create(options, function (err, _res) {
    if (err) {
      // TODO: do something I guess
      console.error(err);
    } else {
      // Log the last few digits of a phone number
      let masked = to.substr(0, to.length - 5);
      masked += '*****';
      console.log(`Message sent to ${masked}`);
    }
  });
}

export async function sendOtpSms(code: string, to: string) {
  const message = `Your MedApt verification PIN is ${code}`;

  if (process.env.USE_TWILIO || process.env.NODE_ENV === 'production') {
    sendSms(message, to);
  } else {
    console.log('*** SMS MESSAGE:', message);
  }
}
