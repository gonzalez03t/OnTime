# OnTime

OnTime is a tool for scheduling and managing appointments, similar to Calendly. Companies may register their businesses to manage appointments, users register to make/manage their own appointments to the businesses.

## Configuration

You will need to write an `.env` file in the format of the `.env.example` provided at the project root, as well as `web/.env`. This will include things like:

- Mongo Connection Credentials
  - https://docs.atlas.mongodb.com/getting-started/
- Twilio API Configs (Keys, SID, Phone Numbers, etc)
  - https://www.twilio.com/docs/sms/quickstart/node#sign-up-for-twilio-and-get-a-twilio-phone-number
- Google Maps API Configs
  - https://developers.google.com/maps/documentation/javascript/get-api-key
  - Be sure to add a Billing account for your project, and restrict the API key you get to your localhost
    - Credentials -> Edit API Key -> Application Restrictions -> HTTP referrers (web sites) -> add the following items: localhost, localhost:3000, 127.0.0.1
- CORS Configuration
- Security Constants (e.g. bcryptjs configs, encryption secrets, etc)

## Installation and Startup

Use Yarn to install the project dependencies:

```bash
$ yarn
$ yarn install:all
```

To run the server and react application at once, run the following:

```bash
$ yarn dev
```

If you would like to run the frontend and backend separately:

To run the backend:

```bash
$ yarn dev:server
```

To run the frontend:

```bash
$ yarn start:web
```

## Overview of Functional Features

For individual milestones, be sure to check out the README files in each of the subfolders in the project root (backend, web and mobile). These will outline more specific completed features.

- Session-based authentication for secure user interactions with the software
- Multifactor authentication, using OTP over SMS
  - One-way hashing of OTP codes and user passwords
- Role-based access control to restrict users of varying privleges
  - Base, Employee, Company Admin/Owner, and Admin roles
- Automated SMS appointment reminders

## Future Work

There is plenty of opportunity for additional features to be developed. A list of potential features include:

- Develop a way to embed the bulk of the scheduling UI as an iframe, so companies may integrate directly on their own website

## Known Issues

Bugs will be tracked using GitHub issues assigned the [`bug`](https://github.com/medapt/medapt/issues?q=is%3Aissue+is%3Aopen+label%3Abug) label.
