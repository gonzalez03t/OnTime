# Appointment Scheduling Manager

FIRST ORDER OF BUSINESS -> Name this project and rename this repository!!

## About this Project

TODO

## Configuration

You will need to write an `.env` file in the format of the `.env.example` provided at the project root. This will include:

- Mongo Connection Credentials
- Twilio API Configs (Keys, SID, Phone Numbers, etc)
- CORS Configuration
- Security Constants (i.e. bcryptjs configs)

## Startup

Only the `backend` is runnable at this time, so run the following to install dependencies and start the development server:

```bash
$ yarn
$ yarn dev:server
```

## Overview of Functional Features

For individual milestones, be sure to check out the README files in each of the subfolders in the `packages` root (backend, web and mobile). These will outline more specific completed features.

- Session-based authentication for secure user interactions with the software
- Role-based access control to restrict users of varying privleges
  - Base, Doctor and Admin roles
- Automated SMS appointment reminders

## Known Issues

Bugs will be tracked using GitHub issues assigned the [`bug`](https://github.com/medapt/tbd/issues?q=is%3Aissue+is%3Aopen+label%3Abug) label.

TODO more
