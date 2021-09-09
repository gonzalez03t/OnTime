# Appointment Scheduling Manager

FIRST ORDER OF BUSINESS -> Name this project and rename this repository!!

## About this Project

TODO

## Configuration

You will need to write an `.env` file in the format of the `.env.example` provided at the project root, as well as `web/.env`. This will include:

- Mongo Connection Credentials
  - https://docs.atlas.mongodb.com/getting-started/
- Twilio API Configs (Keys, SID, Phone Numbers, etc)
  - https://www.twilio.com/docs/sms/quickstart/node#sign-up-for-twilio-and-get-a-twilio-phone-number
- CORS Configuration
- Security Constants (i.e. bcryptjs configs)

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
- Role-based access control to restrict users of varying privleges
  - Base, Employee and Admin roles
- Automated SMS appointment reminders

## Known Issues

Bugs will be tracked using GitHub issues assigned the [`bug`](https://github.com/medapt/medapt/issues?q=is%3Aissue+is%3Aopen+label%3Abug) label.
