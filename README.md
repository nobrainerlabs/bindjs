# Bind.js

Bind.js is a Nest.js + Next.js starter kit framework using TypeORM (Postgres) with a build process via NX and Lerna.
Please read the instructions below to set up the project on your local machine.

## Follow the steps

```sh
yarn bootstrap
```

```sh
yarn api:start:dev
```

## useful scripts

- `npm run release` generate a changelog and tag the repo with a new version, following the conventional commit for version number assignement. use `git push --follow-tags` after.

## Conventions

- This repo follow the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) convention.
