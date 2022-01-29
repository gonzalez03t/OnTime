# OnTime

OnTime is a tool for scheduling and managing appointments, similar to Calendly. Companies may register their businesses to manage appointments, users register to make/manage their own appointments to the businesses.

## Documentation

All documentation is available in the `docs` directory of this repository, for a quick start on what is available for reviewing, please see the [README.md](./docs/README.md) in that directory.

## Getting Started

First, you will need to clone the repository and then install the dependencies using Yarn:

```bash
$ yarn # install root level dependencies
$ yarn install:all # install frontend and backend specific dependencies
```

You will now need to configure your environment before you can run anything, so be sure to review everything in the [Configuration](./docs/Configuration.md) section available in the `docs` directory.

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

## Known Issues

Bugs will be tracked using GitHub issues assigned the [`bug`](https://github.com/medapt/medapt/issues?q=is%3Aissue+is%3Aopen+label%3Abug) label.
