# Appointment Scheduling Manager

FIRST ORDER OF BUSINESS -> Name this project and rename this repository!!

## About this Project

TODO

## Configuration

You will need to write an `.env` file in the format of the `.env.example` provided at the project root. This will include:

- Mongo Connection Credentials
  - https://docs.atlas.mongodb.com/getting-started/
- Twilio API Configs (Keys, SID, Phone Numbers, etc)
  - https://www.twilio.com/docs/sms/quickstart/node#sign-up-for-twilio-and-get-a-twilio-phone-number
- CORS Configuration
- Security Constants (i.e. bcryptjs configs)

## Startup

Only the `backend` is runnable at this time, so run the following to install dependencies and start the development server:

```bash
$ yarn
$ yarn dev:server
```

This will run the server with hot-reloading

## Overview of Functional Features

For individual milestones, be sure to check out the README files in each of the subfolders in the project root (backend, web and mobile). These will outline more specific completed features.

- Session-based authentication for secure user interactions with the software
- Role-based access control to restrict users of varying privleges
  - Base, Doctor and Admin roles
- Automated SMS appointment reminders

## Known Issues

Bugs will be tracked using GitHub issues assigned the [`bug`](https://github.com/medapt/medapt/issues?q=is%3Aissue+is%3Aopen+label%3Abug) label.
