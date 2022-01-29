# Future Work

There is plenty of opportunity for additional features to be developed.

## Proposed Features:

- Some of the controllers should be refactored to follow a more traditional REST pattern (e.g. CompanyController)
- Enhanced admin operations
- Onboarding paperwork for clients
- Tracking a user’s navigation session when using in-app navigation for arrival-time estimations
- Develop a way to embed the bulk of the scheduling UI as an iframe, so companies may integrate directly on their own website
- Enhanced company owner dashboard
- Client check-in
- Max body count
- Company/Employee blocked hours
- Company Structure
- Live messaging system

## Developer QOL Improvements

The following are some suggestions that might be nice to have for future developers:

- Docker configuration
  - This would greatly expedite onboarding for new developers, and make things more consistent for everyone.
  - See the example `docker-compose.yml` file at the end of this file

## Structural Improvements

Additionally, we've put together a list of features that would greatly improve the software at scale/production, but a few come at a large cost (i.e. some heavier refactoring and/or rewriting):

- Replace Session store solution
  - Currently, MongoDB manages sessions, but this is not ideal for a production environment of this application size, as it will increase the load on the database. A [Redis Session Store](https://github.com/tj/connect-redis) would be the more ideal solution at scale.
- Move away from Semantic UI
  - We originally chose Semantic UI because it was the first free UI library we came across that everyone was familiar with. However, we found that it is rather dated and not well-maintained. It has some errors and deprecation warnings, and it is not easy to customize. [Chakra UI](https://chakra-ui.com/docs/getting-started) would be a great, modern replacement. [TailwindCSS](https://tailwindcss.com/) is additionally a great tool for customizing the look of the UI.
- Move away from CRA in favor of [Next.js](https://nextjs.org/)
  - CRA is a great tool for building React applications, but at scale it really can't compete with the feel of a SSR application. Since the endgoal is a scaled, multi-page, complex application, Next would provide a great boost in performance and scalability.

## Example Docker Configuration

Note: I have not tested this, I wrote this as a draft for getting started (I am no docker expert). Be sure to also create the appropriate Dockerfiles.

```yaml
version: '3'

services:
  db:
    image: 'postgres:13'
    ports:
      - '5432:5432'
    restart: unless-stopped
    env_file: .env

  cache:
    image: redis
    ports:
      - 6379:6379
    env_file: .env

  backend:
    image: node:12
    command: yarn dev:server
    ports:
      - 5000:5000
    expose:
      - 5000
    volumes:
      - .:/srv/backend:rw
    working_dir: /srv/backend
    env_file: .env
    depends_on:
      - db
      - cache

  frontend:
    image: node:12
    command: yarn start:web
    ports:
      - 3000:3000
    expose:
      - 3000
    volumes:
      - .:/srv/frontend:rw
    working_dir: /srv/frontend
    env_file: .env
    depends_on:
      - backend
```
