# OnTime - Frontend React Application

This is the React portion of OnTime.

## Configuration

You will need to write an `.env` file in the format of the `.env.example` provided at the react folder root (`ontime/web/.env.example`). This will include:

- Backend Access Information
- Google Maps API Configs
  - https://developers.google.com/maps/documentation/javascript/get-api-key
  - Be sure to add a Billing account for your project, and restrict the API key you get to your localhost
    - Credentials -> Edit API Key -> Application Restrictions -> HTTP referrers (web sites) -> add the following items: localhost, localhost:3000, 127.0.0.1
- Security Constants (i.e. encryption secrets)

TODO: Document stuff
