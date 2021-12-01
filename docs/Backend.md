# Backend

This is the documentation for the backend. It is written in TypeScript, and uses Express and MikroORM.

## Background

While the frontend is written in React + JavaScript, the backend is written in TypeScript. The backend is responsible for the database, authentication, scheduling, etc. If you are unfamiliar with TypeScript, I **highly** recommend you read the [TypeScript documentation](https://www.typescriptlang.org/docs/handbook/basic-types.html) before continuing. There are not many complicated type usages in this application, however having a basic understanding of the type system is a must.

Note: The `tsconfig.json` for the backend is rather strict, and is configured this way to prevent bugs and type errors. If you have unused variables, it will not compile to JS, for example. If you are unfamiliar with `tsconfig.json` options, I recommend you read the corresponding [TypeScript documentation](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) before continuing.

## CronJob

The cronjob is used to find reminders that need SMS sending, and then send the SMS. It is located in `src/util/schedule.ts`. It is scheduled to run every minute, and will send a reminder SMS to the user if the user has a reminder set for a time within 30 seconds behind and 1 minute ahead.

## Database Entities

All database entities are defined in the `src/entities` folder. Entities are defined using Decorated classes, which are annotated by the `@Entity()` decorator ([see here](https://mikro-orm.io/docs/defining-entities)).

Note: It is highly recommeded to review the official [MikroORM documentation](https://mikro-orm.io/docs/installation/), as it contains a lot of useful information.

## Database Connection

MikroORM handles the database connection, configured in the `src/mikro-orm.config.ts` file. The ORM gets initialized in the `src/index.ts` file, and the [Entity Manager](https://mikro-orm.io/docs/entity-manager) is assigned and exported for use throughout the application (see the line `export let em: EntityManager<IDatabaseDriver<Connection>>;`).

## Database Seed

We have developed a seed script that will create the database, and populate it with some data. This is located in `src/util/seed.ts` and `src/util/seedData.js`. If you wish to run the seed, go to the `src/index.ts` file and remove the `true` value in the seed function call:

```ts
if (!PRODUCTION) {
  // await seed(true); // the seed will be skipped when uncommented
  await seed(); // The seed will run
}
```

Be sure to wait until the seed finishes, and then set the parameter to true again (otherwise the seed will run each time you save a file in the backend directory).

## Utilities

There are a range of utilities that are used throughout the application. They are located in the `src/util` folder. `jwt.ts` is not used anymore, but is kept for reference.

## Middlewares

There are a range of middlewares that are used throughout the application controllers. They are located in the `src/middleware` folder. Most are used for authentication controls, and are named according to their permissions allowed (e.g. `adminRoute.ts` will return a failure status if the session user is not an admin).

## Controllers

All express controllers are defined at `backend/src/controllers`. There is a wrapper controller, `ApiController`, which assigns all of the controllers to their respective routes. All of the functions used in the controllers are defined in the `backend/src/endpoints` directory, and are grouped/named accordingly (e.g. AuthController login function is in `endpoints/auth/login`).

### ApiController

All controllers mapped in the ApiController have the `/api` prefix

| Path            | Controller                                      |
| :-------------- | :---------------------------------------------- |
| `/auth`         | [AuthController](#authcontroller)               |
| `/companies`    | [CompanyController](#companycontroller)         |
| `/appointments` | [AppointmentController](#appointmentcontroller) |
| `/users`        | [UserController](#usercontroller)               |
| `/reminders`    | [ReminderController](#remindercontroller)       |
| `/s3/images`    | [S3ImageController](#s3imagecontroller)         |
| `/tokens`       | [TokenController](#tokencontroller)             |

<br/>

### AuthController

Base URL: `/api/auth`

| Path                                       | `/login`                                              |
| :----------------------------------------- | :---------------------------------------------------- |
| <b>Description</b>                         | Creates a session for a user                          |
| <b>Method </b>                             | ![Post Request](./assets/post.png)                    |
| <b>Body Parameters</b>                     |                                                       |
| `email`                                    | Required: yes                                         |
|                                            | Type: string                                          |
|                                            | Description: The email on the user account            |
| `password`                                 | Required: yes                                         |
|                                            | Type: string                                          |
|                                            | Description: The plain-text password entered at login |
| <b>Response object</b>                     |                                                       |
| `{id, firstName, lastName, email, phone }` | Success Type: JSON                                    |
|                                            | Failure Type: JSON (Mikro Error) OR plain-text string |
| <b>Response Status</b>                     |                                                       |
| `200`                                      | Sucessful POST and authentication                     |
| `400`                                      | Missing body parameters                               |
| `500`                                      | Server Error OR Unauthorized                          |

<br/>
<br/>

| Path                   | `/logout`                                             |
| :--------------------- | :---------------------------------------------------- |
| <b>Description</b>     | Destroys a session for a user                         |
| <b>Method </b>         | ![Post Request](./assets/post.png)                    |
| <b>Body Parameters</b> | N/A                                                   |
| <b>Response object</b> |                                                       |
|                        | Success Type: Number (Status only)                    |
|                        | Failure Type: JSON (Mikro Error) OR plain-text string |
| <b>Response Status</b> |                                                       |
| `200`                  | Sucessful logout                                      |
| `500`                  | Server Error OR Unauthorized                          |

<br/>
<br/>

| Path                                        | `/register`                                           |
| :------------------------------------------ | :---------------------------------------------------- |
| <b>Description</b>                          | Creates a user account                                |
| <b>Method </b>                              | ![Post Request](./assets/post.png)                    |
| <b>Body Parameters</b>                      |                                                       |
| `firstName`                                 | Required: yes                                         |
|                                             | Type: string                                          |
|                                             | Description: The users first name                     |
| `lastName`                                  | Required: yes                                         |
|                                             | Type: string                                          |
|                                             | Description: The users last name                      |
| `email`                                     | Required: yes                                         |
|                                             | Type: string                                          |
|                                             | Description: The email on the user account            |
| `password`                                  | Required: yes                                         |
|                                             | Type: string                                          |
|                                             | Description: The plain-text password user wants       |
| <b>Response object</b>                      |                                                       |
| `{ id, firstName, lastName, email, phone }` | Success Type: UserDetails (JSON)                      |
|                                             | Failure Type: JSON (Mikro Error) OR plain-text string |
| <b>Response Status</b>                      |                                                       |
| `200`                                       | Sucessful POST and authentication                     |
| `400`                                       | Missing body parameters                               |
| `500`                                       | Server Error                                          |

<br />
<br />

| Path                   | `/register-company-owner`                              |
| :--------------------- | :----------------------------------------------------- |
| <b>Description</b>     | Creates a user account and company                     |
| <b>Method </b>         | ![Post Request](./assets/post.png)                     |
| <b>Body Parameters</b> |                                                        |
| `userDetails`          | Required: yes                                          |
|                        | Type: JSON                                             |
|                        | Description: The user information (see `/register`)    |
| `companyDetails`       | Required: yes                                          |
|                        | Type: JSON                                             |
|                        | Description: The company info (see `/api/company/new`) |
| <b>Response Status</b> |                                                        |
| `200`                  | Sucessful POST and authentication                      |
| `400`                  | Missing body parameters                                |
| `500`                  | Server Error                                           |

<br />
<br />

| Path                   | `/otp/validate`                                       |
| :--------------------- | :---------------------------------------------------- |
| <b>Description</b>     | Validates an OTP code                                 |
| <b>Method </b>         | ![Post Request](./assets/post.png)                    |
| <b>Body Parameters</b> |                                                       |
| `code`                 | Required: yes                                         |
|                        | Type: string                                          |
|                        | Description: The OTP code the user typed in           |
| <b>Response object</b> |                                                       |
| `{valid}`              | Success Type: JSON                                    |
|                        | Failure Type: JSON (Mikro Error) OR plain-text string |
| <b>Response Status</b> |                                                       |
| `200`                  | Sucessful validity of OTP code                        |
| `400`                  | Missing body parameters                               |
| `401`                  | Invalid OTP code OR Expired OTP                       |
| `500`                  | Server Error OR Unauthorized                          |

<br/>
<br/>

| Path                   | `/otp/new`                                            |
| :--------------------- | :---------------------------------------------------- |
| <b>Description</b>     | Creates a new OTP for a user                          |
| <b>Method </b>         | ![Post Request](./assets/post.png)                    |
| <b>Response object</b> |                                                       |
| `{valid}`              | Success Type: JSON                                    |
|                        | Failure Type: JSON (Mikro Error) OR plain-text string |
| <b>Response Status</b> |                                                       |
| `201`                  | Sucessful created new OTP                             |
| `400`                  | Missing body parameters                               |
| `500`                  | Server Error OR Unauthorized                          |

<br/>
<br/>

| Path                   | `/password/forgot`                                    |
| :--------------------- | :---------------------------------------------------- |
| <b>Description</b>     | TODO                                                  |
| <b>Method </b>         | ![Post Request](./assets/post.png)                    |
| <b>Response object</b> |                                                       |
| `{TODO}`               | Success Type: JSON                                    |
|                        | Failure Type: JSON (Mikro Error) OR plain-text string |
| <b>Response Status</b> |                                                       |
| `500`                  | Server Error OR Unauthorized                          |

<br/>

### CompanyController

Base URL: `/api/companies`

| Path                   | `/`                                                   |
| :--------------------- | :---------------------------------------------------- |
| <b>Description</b>     | Retrieves a list of all companies                     |
| <b>Method </b>         | ![Get Request](./assets/get.png)                      |
| <b>Body Parameters</b> |                                                       |
| <b>Response object</b> |                                                       |
| `[{...}]`              | Success Type: Company[] (JSON)                        |
|                        | Failure Type: JSON (Mikro Error) OR plain-text string |
| <b>Response Status</b> |                                                       |
| `200`                  | Sucessful response                                    |
| `500`                  | Server Error                                          |

<br/>
<br/>

| Path                   | `/new`                                                                            |
| :--------------------- | :-------------------------------------------------------------------------------- |
| <b>Description</b>     | Creates a new, unverified company                                                 |
| <b>Method </b>         | ![Post Request](./assets/post.png)                                                |
| <b>Body Parameters</b> |                                                                                   |
| `name`                 | Required: yes                                                                     |
|                        | Type: string                                                                      |
|                        | Description: The name of the company (unique w/ address)                          |
| `address`              | Required: yes                                                                     |
|                        | Type: JSON `{street, unit, city, stateProvince, postalCode, country}`             |
|                        | Description: Looks for appointments scheduled within this date range              |
|                        | When absent, default searches for appointments from today to the end of the month |
| `phone`                | Required: yes                                                                     |
|                        | Type: string                                                                      |
|                        | Description: The company phone number                                             |
| <b>Response object</b> |                                                                                   |
| <b>Response Status</b> |                                                                                   |
| `200`                  | Sucessful response                                                                |
| `400`                  | Bad Request                                                                       |
| `500`                  | Server Error                                                                      |

<br/>
<br/>

| Path                   | `/employees`                                          |
| :--------------------- | :---------------------------------------------------- |
| <b>Description</b>     | Gets a list of employees working at a Company         |
| <b>Method </b>         | ![Post Request](./assets/post.png)                    |
| <b>Body Parameters</b> |                                                       |
| `companyId`            | Required: yes                                         |
|                        | Type: string                                          |
|                        | Description: The ID in the database                   |
| <b>Response object</b> |                                                       |
| `[{...}]`              | Success Type: EmployeeUserDetails[] (JSON)            |
|                        | Failure Type: JSON (Mikro Error) OR plain-text string |
| <b>Response Status</b> |                                                       |
| `200`                  | Sucessful response                                    |
| `400`                  | Bad Request                                           |
| `500`                  | Server Error                                          |

<br/>
<br/>

| Path                   | `/employees/invite`                                         |
| :--------------------- | :---------------------------------------------------------- |
| <b>Description</b>     | Invite new employee by email                                |
| <b>Method </b>         | ![Post Request](./assets/post.png)                          |
| <b>Body Parameters</b> |                                                             |
| `email`                | Required: yes                                               |
|                        | Type: string                                                |
|                        | Description: The email of the user to invite as an employee |
| <b>Response object</b> |                                                             |
| <b>Response Status</b> |                                                             |
| `200`                  | Sucessful response                                          |
| `400`                  | Bad Request                                                 |
| `401`                  | Not a company owner                                         |
| `500`                  | Server Error                                                |

<br/>
<br/>

| Path                   | `/employees/new`                                       |
| :--------------------- | :----------------------------------------------------- |
| <b>Description</b>     | Create new user that is employee for logged in company |
| <b>Method </b>         | ![Post Request](./assets/post.png)                     |
| <b>Body Parameters</b> | **See `api/register`**                                 |
| <b>Response object</b> |                                                        |
| <b>Response Status</b> |                                                        |
| `201`                  | Sucessful response                                     |
| `400`                  | Bad Request                                            |
| `401`                  | Not a company owner/admin                              |
| `500`                  | Server Error / Existing Account                        |

<br/>
<br/>

| Path                   | `/employees/remove`                                      |
| :--------------------- | :------------------------------------------------------- |
| <b>Description</b>     | Remove user as employee, set role to base                |
| <b>Method </b>         | ![Post Request](./assets/post.png)                       |
| <b>Body Parameters</b> |                                                          |
| `employeeId`           | Required: yes                                            |
|                        | Type: string                                             |
|                        | Description: The id of the user to remove as an employee |
| <b>Response object</b> |                                                          |
| <b>Response Status</b> |                                                          |
| `201`                  | Sucessful response                                       |
| `400`                  | Bad Request                                              |
| `401`                  | Not a company owner/admin                                |
| `500`                  | Server Error / No Account Found                          |

<br/>
<br/>

| Path                    | `:id/profile`                      |
| :---------------------- | :--------------------------------- |
| <b>Description</b>      | Get Company details by ID          |
| <b>Method </b>          | ![Get Request](./assets/get.png)   |
| <b>Body Parameters</b>  |                                    |
| <b>Query Parameters</b> |                                    |
| `id`                    | Required: yes                      |
|                         | Type: string                       |
|                         | Description: The id of the company |
| <b>Response object</b>  |                                    |
| <b>Response Status</b>  |                                    |
| `201`                   | Sucessful response                 |
| `400`                   | Bad Request                        |
| `500`                   | Server Error                       |

<br/>
<br/>

| Path                    | `:id/settings`                                                                        |
| :---------------------- | :------------------------------------------------------------------------------------ |
| <b>Description</b>      | Update company settings by ID                                                         |
| <b>Method </b>          | ![Put Request](./assets/put.png)                                                      |
| <b>Body Parameters</b>  |                                                                                       |
| `companySettings`       | Required: yes                                                                         |
|                         | type: JSON `{ employeeTitle, opensAt, closesAt, appointmentDuration, maxBodyCount } ` |
| <b>Query Parameters</b> |                                                                                       |
| `id`                    | Required: yes                                                                         |
|                         | Type: string                                                                          |
|                         | Description: The id of the company                                                    |
| <b>Response object</b>  |                                                                                       |
| <b>Response Status</b>  |                                                                                       |
| `201`                   | Sucessful response                                                                    |
| `400`                   | Bad Request                                                                           |
| `401`                   | Not a company owner/admin                                                             |
| `500`                   | Server Error                                                                          |

<br/>
<br/>

| Path                   | `/pending`                                            |
| :--------------------- | :---------------------------------------------------- |
| <b>Description</b>     | Retrieves a list of all non-verified companies        |
| <b>Method </b>         | ![Get Request](./assets/get.png)                      |
| <b>Body Parameters</b> |                                                       |
| <b>Response object</b> |                                                       |
| `[{...}]`              | Success Type: Company[] (JSON)                        |
|                        | Failure Type: JSON (Mikro Error) OR plain-text string |
| <b>Response Status</b> |                                                       |
| `200`                  | Sucessful response                                    |
| `500`                  | Server Error                                          |

<br/>
<br/>

| Path                    | `/:id/status`                            |
| :---------------------- | :--------------------------------------- |
| <b>Description</b>      | Sets the VerificationStatus of a company |
| <b>Method </b>          | ![Put Request](./assets/put.png)         |
| <b>Body Parameters</b>  |                                          |
| <b>Query Parameters</b> |                                          |
| `id`                    | Required: yes                            |
|                         | Type: string                             |
|                         | Description: The id of the company       |
| <b>Response object</b>  |                                          |
| <b>Response Status</b>  |                                          |
| `200`                   | Sucessful response                       |
| `400`                   | Bad Request                              |
| `500`                   | Server Error                             |

<br/>
<br/>

| Path                    | `/:id/image/status`                            |
| :---------------------- | :--------------------------------------------- |
| <b>Description</b>      | Sets the VerificationStatus of a company image |
| <b>Method </b>          | ![Put Request](./assets/put.png)               |
| <b>Body Parameters</b>  |                                                |
| <b>Query Parameters</b> |                                                |
| `id`                    | Required: yes                                  |
|                         | Type: string                                   |
|                         | Description: The id of the company             |
| <b>Response object</b>  |                                                |
| <b>Response Status</b>  |                                                |
| `200`                   | Sucessful response                             |
| `500`                   | Server Error                                   |

<br/>

### AppointmentController

Base URL: `/api/appointments`

| Path                               | `/`                                                     |
| :--------------------------------- | :------------------------------------------------------ |
| <b>Description</b>                 | Retrieves a list of all appointments for logged in user |
| <b>Method </b>                     | ![Get Request](./assets/get.png)                        |
| <b>Body Parameters</b>             |                                                         |
| <b>Response object</b>             |                                                         |
| `[{ id, startsAt, employee, ...}]` | Success Type: Appointment[] (JSON)                      |
|                                    | Failure Type: JSON (Mikro Error) OR plain-text string   |
| <b>Response Status</b>             |                                                         |
| `200`                              | Sucessful response                                      |
| `500`                              | Server Error                                            |

<br/>
<br/>

| Path                     | `/filled`                                                                         |
| :----------------------- | :-------------------------------------------------------------------------------- |
| <b>Description</b>       | Retrieves a list of scheduled appointments                                        |
| <b>Method </b>           | ![Post Request](./assets/post.png)                                                |
| <b>Body Parameters</b>   |                                                                                   |
| `dateRange`              | Required: no                                                                      |
|                          | Type: JSON `{start, end}`                                                         |
|                          | Description: Looks for appointments scheduled within this date range              |
|                          | When absent, default searches for appointments from today to the end of the month |
| <b>Response object</b>   |                                                                                   |
| `[{startsAt, duration}]` | Success Type: Partial<Appointment>[] (JSON)                                       |
|                          | Failure Type: JSON (Mikro Error) OR plain-text string                             |
| <b>Response Status</b>   |                                                                                   |
| `200`                    | Sucessful response                                                                |
| `500`                    | Server Error                                                                      |

<br/>
<br/>

| Path                   | `/available`                                                         |
| :--------------------- | :------------------------------------------------------------------- |
| <b>Description</b>     | Retrieves a list of available slots                                  |
| <b>Method </b>         | ![Post Request](./assets/post.png)                                   |
| <b>Body Parameters</b> |                                                                      |
| `date`                 | Required: yes                                                        |
|                        | Type: Date                                                           |
|                        | Description: Looks for appointments scheduled on this date           |
| `employeeId`           | Required: yes                                                        |
|                        | Type: string                                                         |
|                        | Description: The ID of the employee to schedule the appointment with |
| <b>Response object</b> |                                                                      |
| `[{start, end}]`       | Success Type: Partial<Appointment>[] (JSON)                          |
|                        | Failure Type: JSON (Mikro Error) OR plain-text string                |
| <b>Response Status</b> |                                                                      |
| `200`                  | Sucessful response                                                   |
| `400`                  | Bad Request                                                          |
| `401`                  | No Auth                                                              |
| `500`                  | Server Error                                                         |

<br/>
<br/>

| Path                             | `/new`                                                                |
| :------------------------------- | :-------------------------------------------------------------------- |
| <b>Description</b>               | Create a new appointment                                              |
| <b>Method </b>                   | ![Post Request](./assets/post.png)                                    |
| <b>Body Parameters</b>           |                                                                       |
| `employeeEmail`                  | Required: yes                                                         |
|                                  | Type: string                                                          |
|                                  | Description: the email of the employee the appointment is with        |
| `startsAt`                       | Required: yes                                                         |
|                                  | Type: string                                                          |
|                                  | Description: the date/time of the appointment                         |
| `wantsReminder`                  | Required: no                                                          |
|                                  | Type: boolean                                                         |
|                                  | Description: indication of if the client wants a twilio reminder sent |
| `companyId`                      | Required: yes                                                         |
|                                  | Type: string                                                          |
|                                  | Description: ID of the company                                        |
| `clientId`                       | Required: yes, if session user is employee                            |
|                                  | Type: string                                                          |
|                                  | Description: ID of the user who is the client                         |
| <b>Response object</b>           |                                                                       |
| `{ id, startsAt, employee, ...}` | Success Type: Appointment (JSON)                                      |
|                                  | Failure Type: JSON (Mikro Error) OR plain-text string                 |
| <b>Response Status</b>           |                                                                       |
| `200`                            | Sucessful response                                                    |
| `400`                            | Missing body parameters                                               |
| `500`                            | Server Error                                                          |

<br/>
<br/>

| Path                   | `/cancel`                                        |
| :--------------------- | :----------------------------------------------- |
| <b>Description</b>     | Cancel an appointment                            |
| <b>Method </b>         | ![Post Request](./assets/post.png)               |
| <b>Body Parameters</b> |                                                  |
| `clientId`             | Required: yes, if session user is employee       |
|                        | Type: string                                     |
|                        | Description: ID of the user who is the client    |
| `appointmentId`        | Required: yes                                    |
|                        | Type: string                                     |
|                        | Description: The ID of the appointment to cancel |
| <b>Response object</b> |                                                  |
| <b>Response Status</b> |                                                  |
| `200`                  | Sucessful response                               |
| `400`                  | Bad Request / Past Appointment                   |
| `401`                  | No Auth                                          |
| `500`                  | Server Error                                     |

<br />
<br/>

| Path                   | `/reschedule`                                        |
| :--------------------- | :--------------------------------------------------- |
| <b>Description</b>     | Reschedules an appointment                           |
| <b>Method </b>         | ![Post Request](./assets/post.png)                   |
| <b>Body Parameters</b> |                                                      |
| `newDateTime`          | Required: yes                                        |
|                        | Type: Date                                           |
|                        | Description: New date for appointment                |
| `clientId`             | Required: yes, if session user is employee           |
|                        | Type: string                                         |
|                        | Description: ID of the user who is the client        |
| `appointmentId`        | Required: yes                                        |
|                        | Type: string                                         |
|                        | Description: The ID of the appointment to reschedule |
| <b>Response object</b> |                                                      |
| <b>Response Status</b> |                                                      |
| `200`                  | Sucessful response                                   |
| `400`                  | Bad Request                                          |
| `401`                  | No Auth                                              |
| `500`                  | Server Error                                         |

<br />

### UserController

Base URL: `/api/users`

| Path                                  | `/viewer`                          |
| :------------------------------------ | :--------------------------------- |
| <b>Description</b>                    | Returns the logged in user details |
| <b>Method </b>                        | ![Get Request](./assets/get.png)   |
| <b>Body Parameters</b>                | N/A                                |
| <b>Response object</b>                |                                    |
| `{id,firstName,lastName,email,phone}` | Success Type: UserDetails (JSON)   |
|                                       | Failure Type: JSON (Mikro Error)   |
| <b>Response Status</b>                |                                    |
| `200`                                 | Sucessful GET                      |
| `500`                                 | Server Error                       |

<br/>
<br/>

| Path                   | `/favorites`                                       |
| :--------------------- | :------------------------------------------------- |
| <b>Description</b>     | Returns the favorited companies for logged in user |
| <b>Method </b>         | ![Get Request](./assets/get.png)                   |
| <b>Body Parameters</b> |                                                    |
| <b>Response object</b> |                                                    |
|                        | Success Type: Company[] (JSON)                     |
|                        | Failure Type: JSON (Mikro Error)                   |
| <b>Response Status</b> |                                                    |
| `200`                  | Sucessful GET                                      |
| `500`                  | Server Error                                       |

<br/>
<br/>

| Path                   | `/hasFutureAppointments`                                   |
| :--------------------- | :--------------------------------------------------------- |
| <b>Description</b>     | Returns whether or not the user has appointments scheduled |
| <b>Method </b>         | ![Get Request](./assets/get.png)                           |
| <b>Body Parameters</b> |                                                            |
| <b>Response object</b> |                                                            |
|                        | Success Type: boolean                                      |
| <b>Response Status</b> |                                                            |
| `200`                  | Sucessful GET                                              |
| `500`                  | Server Error                                               |

<br/>
<br/>

| Path                   | `/favorites`                       |
| :--------------------- | :--------------------------------- |
| <b>Description</b>     | Toggle favorite company            |
| <b>Method </b>         | ![Post Request](./assets/post.png) |
| <b>Body Parameters</b> |                                    |
| `companyId`            | Required: yes                      |
|                        | Type: string                       |
|                        | Description: the ID of the company |
| <b>Response object</b> |                                    |
| <b>Response Status</b> |                                    |
| `201`                  | Sucessful Update                   |
| `500`                  | Server Error                       |

<br/>
<br/>

| Path                   | `/settings/profile`                                       |
| :--------------------- | :-------------------------------------------------------- |
| <b>Description</b>     | Update user profile details                               |
| <b>Method </b>         | ![Put Request](./assets/put.png)                          |
| <b>Body Parameters</b> |                                                           |
| `userDetails`          | Required: yes                                             |
|                        | Type: JSON `{ firstName, lastName, email, phone, s3Key }` |
|                        | Description: The user details to update                   |
| <b>Response object</b> |                                                           |
| <b>Response Status</b> |                                                           |
| `201`                  | Sucessful Update                                          |
| `500`                  | Server Error                                              |

<br/>
<br/>

| Path                   | `/settings/notifications`                     |
| :--------------------- | :-------------------------------------------- |
| <b>Description</b>     | Update user notification settings             |
| <b>Method </b>         | ![Put Request](./assets/put.png)              |
| <b>Body Parameters</b> |                                               |
| `newPreference`        | Required: yes                                 |
|                        | Type: Enum (NotificationPreference) - string  |
|                        | Description: The user notification preference |
| <b>Response object</b> |                                               |
| <b>Response Status</b> |                                               |
| `200`                  | Sucessful Update                              |
| `500`                  | Server Error                                  |

<br/>
<br/>

| Path                   | `/settings/password`                                |
| :--------------------- | :-------------------------------------------------- |
| <b>Description</b>     | Update user password                                |
| <b>Method </b>         | ![Put Request](./assets/put.png)                    |
| <b>Body Parameters</b> |                                                     |
| `tokenType`            | Required: yes                                       |
|                        | Type: string                                        |
|                        | Description: the type of token                      |
| `code`                 | Required: yes                                       |
|                        | Type: string                                        |
|                        | Description: the code the user entered in otp modal |
| `email`                | Required: yes                                       |
|                        | Type: string                                        |
|                        | Description: the email of the user                  |
| `phone`                | Required: yes                                       |
|                        | Type: string                                        |
|                        | Description: the phone number of the user           |
| `password`             | Required: yes                                       |
|                        | Type: string                                        |
|                        | Description: the new password                       |
| <b>Response object</b> |                                                     |
| <b>Response Status</b> |                                                     |
| `200`                  | Sucessful Update                                    |
| `400`                  | Bad Request / Invalid Token / Missing Params        |
| `403`                  | Invalid code                                        |
| `500`                  | Server Error                                        |

<br/>
<br/>

| Path                    | `/:id/role`                            |
| :---------------------- | :------------------------------------- |
| <b>Description</b>      | Set user role                          |
| <b>Method </b>          | ![Put Request](./assets/put.png)       |
| <b>Query Parameters</b> |                                        |
| `id`                    | Required: yes                          |
|                         | Type: string                           |
|                         | Description: The id of the user        |
| <b>Body Parameters</b>  |                                        |
| `role`                  | Required: yes                          |
|                         | Type: Enum (UserRole) - string         |
|                         | Description: the new role for the user |
| <b>Response object</b>  |                                        |
| <b>Response Status</b>  |                                        |
| `200`                   | Sucessful Update                       |
| `400`                   | Bad Request                            |
| `401`                   | No Auth                                |
| `403`                   | Not Admin                              |
| `500`                   | Server Error                           |

<br/>
<br/>

| Path                    | `/:id/image/status`                       |
| :---------------------- | :---------------------------------------- |
| <b>Description</b>      | Sets the user's image status              |
| <b>Method </b>          | ![Put Request](./assets/put.png)          |
| <b>Query Parameters</b> |                                           |
| `id`                    | Required: yes                             |
|                         | Type: string                              |
|                         | Description: The id of the user           |
| <b>Body Parameters</b>  |                                           |
| `status`                | Required: yes                             |
|                         | Type: Enum (VerificationStatus) - string  |
|                         | Description: The new status for the image |
| <b>Response object</b>  |                                           |
| <b>Response Status</b>  |                                           |
| `200`                   | Sucessful Update                          |
| `400`                   | Bad Request                               |
| `401`                   | No Auth                                   |
| `403`                   | Not Admin                                 |
| `500`                   | Server Error                              |

<br/>

### ReminderController

Base URL: `/api/reminders`

| Path                                  | `/`                                  |
| :------------------------------------ | :----------------------------------- |
| <b>Description</b>                    | Get all reminders for logged in user |
| <b>Method </b>                        | ![Get Request](./assets/get.png)     |
| <b>Body Parameters</b>                |                                      |
| <b>Response object</b>                |                                      |
| `{id,firstName,lastName,email,phone}` | Success Type: Reminder[] (JSON)      |
|                                       | Failure Type: JSON (Mikro Error)     |
| <b>Response Status</b>                |                                      |
| `200`                                 | Sucessful Update                     |
| `400`                                 | Bad Request                          |
| `401`                                 | No Auth                              |
| `500`                                 | Server Error                         |

<br/>

### S3ImageController

Base URL: `/api/s3/images`

| Path                    | `/:key`                                            |
| :---------------------- | :------------------------------------------------- |
| <b>Description</b>      | Get image by S3 Key                                |
| <b>Method </b>          | ![Get Request](./assets/get.png)                   |
| <b>Query Parameters</b> |                                                    |
| `key`                   | Required: yes                                      |
|                         | Type: string                                       |
|                         | Description: The key of the image in the S3 Bucket |
| <b>Body Parameters</b>  |                                                    |
| <b>Response object</b>  |                                                    |
|                         | Success Type: Read Stream piped into res           |
| <b>Response Status</b>  |                                                    |
| `200`                   | Sucessful Update                                   |
| `400`                   | Missing key                                        |
| `500`                   | Server Error                                       |

<br/>
<br/>

| Path                   | `/`                                                                      |
| :--------------------- | :----------------------------------------------------------------------- |
| <b>Description</b>     | Upload new image to S3 bucket                                            |
| <b>Method </b>         | ![Post Request](./assets/post.png)                                       |
| <b>Body Parameters</b> |                                                                          |
| `key`                  | Required: yes                                                            |
|                        | Type: string                                                             |
|                        | Description: The key of the image in the S3 Bucket                       |
| `fileContents`         | Required: yes                                                            |
|                        | Type: string buffer (image data, will be encoded base64 on server)       |
|                        | Description: The key of the image in the S3 Bucket                       |
| `type`                 | Required: yes                                                            |
|                        | Type: string                                                             |
|                        | Description: A standard MIME type describing the format of the contents. |
| <b>Response object</b> |                                                                          |
|                        | Success Type: Read Stream piped into res                                 |
| <b>Response Status</b> |                                                                          |
| `200`                  | Sucessful Update                                                         |
| `400`                  | Missing key                                                              |
| `500`                  | Server Error                                                             |

<br/>
<br/>

| Path                    | `/:key`                                            |
| :---------------------- | :------------------------------------------------- |
| <b>Description</b>      | Delete image by S3 Key                             |
| <b>Method </b>          | ![Delete Request](./assets/delete.png)             |
| <b>Query Parameters</b> |                                                    |
| `key`                   | Required: yes                                      |
|                         | Type: string                                       |
|                         | Description: The key of the image in the S3 Bucket |
| <b>Body Parameters</b>  |                                                    |
| <b>Response object</b>  |                                                    |
| <b>Response Status</b>  |                                                    |
| `200`                   | Sucessful Delete                                   |
| `400`                   | Missing key                                        |
| `500`                   | Server Error                                       |

<br/>

### TokenController

Base URL: `/api/tokens`

| Path                    | `/password/change`                                 |
| :---------------------- | :------------------------------------------------- |
| <b>Description</b>      | Create token to change password (existing session) |
| <b>Method </b>          | ![Post Request](./assets/post.png)                 |
| <b>Query Parameters</b> |                                                    |
| <b>Body Parameters</b>  |                                                    |
| <b>Response object</b>  |                                                    |
| <b>Response Status</b>  |                                                    |
| `201`                   | Sucessful Creation                                 |
| `403`                   | No Auth                                            |
| `500`                   | Server Error                                       |

<br/>
<br/>

| Path                    | `/password/forgot`                                     |
| :---------------------- | :----------------------------------------------------- |
| <b>Description</b>      | Create token to change forgotten password (no session) |
| <b>Method </b>          | ![Post Request](./assets/post.png)                     |
| <b>Query Parameters</b> |                                                        |
| <b>Body Parameters</b>  |                                                        |
| `email`                 | Required: yes                                          |
|                         | Type: string                                           |
|                         | Description: The email of the user                     |
| `phone`                 | Required: yes                                          |
|                         | Type: string                                           |
|                         | Description: The phone number for the user             |
| <b>Response object</b>  |                                                        |
| <b>Response Status</b>  |                                                        |
| `200`                   | Successful Creation                                    |
| `500`                   | Server Error                                           |
