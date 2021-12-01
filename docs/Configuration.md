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
