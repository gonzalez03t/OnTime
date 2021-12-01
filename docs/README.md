# OnTime Documentation

This documentation should provide you with everything you need to get started with OnTime, and is broken up into the following:

- [Configuration](./Configuration.md)
- [Backend](./Backend.md)
- [Frontend](./Frontend.md)
- [Future Work](./FutureWork.md)

## Major, Functional Features

This is an overview of the **most important** features **currently** completed. For individual milestones, be sure to check out the README files in each of the subfolders in the project root (backend, web and mobile) and the issues from the GitHub projects.

- Session-based authentication for secure user interactions with the software
- Multifactor authentication, using OTP over SMS
  - One-way hashing of OTP codes and user passwords
- Role-based access control to restrict users of varying privleges
  - Base, Employee, Company Admin/Owner, and Admin roles
- Encrypted storage of all client-side data
  - Encryption algorithm configured via environment variables
- Automated SMS appointment reminders
- Appointment scheduling and management
  - Appointment creation, deletion, and modification
