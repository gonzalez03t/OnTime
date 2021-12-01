# Configuration

## Developer Environment

If you use VSCode, we have included a list of suggested extensions to help you during development. On launch, these will prompt you to install. If you don't want to use them, you can just select the Ignore option or Don't Show Again.

## Project Environment and Environment Variables

You will need to write two `.env` files for this project. For both, refer to the `.env.example` provided at the project root, as well as `web/.env.example`. This will include things like:

- Mongo Connection Credentials
  - https://docs.atlas.mongodb.com/getting-started/
- Twilio API Configs (Keys, SID, Phone Numbers, etc)
  - https://www.twilio.com/docs/sms/quickstart/node#sign-up-for-twilio-and-get-a-twilio-phone-number
- Google Maps API Configs
  - https://developers.google.com/maps/documentation/javascript/get-api-key
  - Enable the following APIs: Geocoding, Maps, Places
  - Be sure to add a Billing account for your project, and restrict the API key you get to your localhost
    - Credentials -> Edit API Key -> Application Restrictions -> HTTP referrers (web sites) -> add the following items: localhost, localhost:3000, 127.0.0.1
- AWS S3 Bucket Configs
  - follow [this](https://www.youtube.com/watch?v=NZElg91l_ms) tutorial from 4:38 to 11:25
- CORS Configuration
- Security Constants (e.g. bcryptjs configs, encryption secrets, etc)

In general, you will want to use the `.env.example` files as a starting point. You can then add your own values to the `.env` file, and it is recommended to share certain variables with your team (although not all variables should be shared). As a starting point, try sharing the following key/values in your root `.env` file:

```
FRONTEND_URL=http://localhost:3000

BCRYPT_SALT=12

OTP_ALGORITHM=SHA-512
OTP_EXIRE_IN_MIN=5
INVITE_EXIRE_IN_DAYS=5

USE_TWILIO=
LOOK_FOR_REMINDERS=
```

While these same values shouldn't be used in production, but they will make getting started with development easier.
