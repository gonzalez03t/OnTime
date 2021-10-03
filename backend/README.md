# backend

This is the backend for the TBD app. Written in TypeScript, using Express, Twilio and Mikro-ORM.

## Configuration

Please follow the [Configuration](https://github.com/medapt/medapt#Configuration) steps outlined at the root project readme.

## Testing

The API implementation was heavily tested using Postman prior to connecting with any frontend clients. The Postman collection _WILL_ be publicly available once completed.

## Middleware

TODO: write me

## Controllers

All express controllers are defined at `backend/src/controllers`. There is a wrapper controller, `ApiController`, which assigns all of the controllers to their respective routes. All of the functions used in the controllers are defined in the `backend/src/endpoints` directory, and are grouped/named accordingly (e.g. AuthController login function is in `endpoints/auth/login`).

### ApiController

All controllers mapped in the ApiController have the `/api` prefix

| Path            | Controller                                      |
| :-------------- | :---------------------------------------------- |
| `/admin`        | [AdminController](#admincontroller)             |
| `/auth`         | [AuthController](#authcontroller)               |
| `/company`      | [CompanyController](#companycontroller)         |
| `/appointments` | [AppointmentController](#appointmentcontroller) |
| `/users`        | [UserController](#usercontroller)               |
| `/reminders`    | [ReminderController](#remindercontroller)       |

<br/>

### AdminController

Base URL: `/api/admin`

| Path                                    | `/users`                               |
| :-------------------------------------- | :------------------------------------- |
| <b>Description</b>                      | Returns a list of all registered users |
| <b>Method </b>                          | ![Get Request](./assets/get.png)       |
| <b>Body Parameters</b>                  | N/A                                    |
| <b>Response object</b>                  |                                        |
| `[{id,firstName,lastName,email,phone}]` | Success Type: JSON                     |
|                                         | Failure Type: JSON (Mikro Error)       |
| <b>Response Status</b>                  |                                        |
| `200`                                   | Sucessful GET                          |
| `500`                                   | Server Error                           |

<br/>
<br/>

| Path                   | `/users/change-role`                                  |
| :--------------------- | :---------------------------------------------------- |
| <b>Description</b>     | Changes the role of a given user                      |
| <b>Method </b>         | ![Post Request](./assets/post.png)                    |
| <b>Body Parameters</b> |                                                       |
| `email`                | Required: yes                                         |
|                        | Type: string                                          |
|                        | Description: The email of the user to change          |
| `newRole`              | Required: yes                                         |
|                        | Type: string                                          |
|                        | Description: The new role to assign them              |
| <b>Response object</b> |                                                       |
|                        | Success Type: Status and String message               |
|                        | Failure Type: JSON (Mikro Error) OR plain-text string |
| <b>Response Status</b> |                                                       |
| `200`                  | Sucessful update                                      |
| `400`                  | Missing body parameters                               |
| `500`                  | Server Error OR Unauthorized                          |

<br/>
<br/>

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

### CompanyController

Base URL: `/api/company`

TODO: write the docs

<br/>
<br/>

### AppointmentController

Base URL: `/api/appointments`

| Path                                | `/`                                                     |
| :---------------------------------- | :------------------------------------------------------ |
| <b>Description</b>                  | Retrieves a list of all appointments for logged in user |
| <b>Method </b>                      | ![Get Request](./assets/get.png)                        |
| <b>Body Parameters</b>              |                                                         |
| <b>Response object</b>              |                                                         |
| `[{ _id, startsAt, employee, ...}]` | Success Type: Appointment[] (JSON)                      |
|                                     | Failure Type: JSON (Mikro Error) OR plain-text string   |
| <b>Response Status</b>              |                                                         |
| `200`                               | Sucessful response                                      |
| `500`                               | Server Error                                            |

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

| Path                              | `/new`                                                                |
| :-------------------------------- | :-------------------------------------------------------------------- |
| <b>Description</b>                | Create a new appointment                                              |
| <b>Method </b>                    | ![Post Request](./assets/post.png)                                    |
| <b>Body Parameters</b>            |                                                                       |
| `employeeEmail`                   | Required: yes                                                         |
|                                   | Type: string                                                          |
|                                   | Description: the email of the employee the appointment is with        |
| `startsAt`                        | Required: yes                                                         |
|                                   | Type: string                                                          |
|                                   | Description: the date/time of the appointment                         |
| `wantsReminder`                   | Required: no                                                          |
|                                   | Type: boolean                                                         |
|                                   | Description: indication of if the client wants a twilio reminder sent |
| <b>Response object</b>            |                                                                       |
| `{ _id, startsAt, employee, ...}` | Success Type: Appointment (JSON)                                      |
|                                   | Failure Type: JSON (Mikro Error) OR plain-text string                 |
| <b>Response Status</b>            |                                                                       |
| `200`                             | Sucessful response                                                    |
| `400`                             | Missing body parameters                                               |
| `500`                             | Server Error                                                          |

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

### ReminderController

Base URL: `/api/reminders`

TODO
