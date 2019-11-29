# broadcaster

[![Build Status](https://travis-ci.org/Elvis-rugamba/broadcaster.svg?branch=integrate-travis-ci)](https://travis-ci.org/Elvis-rugamba/broadcaster)
[![Coverage Status](https://coveralls.io/repos/github/Elvis-rugamba/broadcaster/badge.svg?branch=fixing-travisCI-test-image-issue-169989415)](https://coveralls.io/github/Elvis-rugamba/broadcaster?branch=fixing-travisCI-test-image-issue-169989415)
[![Maintainability](https://api.codeclimate.com/v1/badges/83a178d27820916e60c8/maintainability)](https://codeclimate.com/github/Elvis-rugamba/broadcaster/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/83a178d27820916e60c8/test_coverage)](https://codeclimate.com/github/Elvis-rugamba/broadcaster/test_coverage)


Broadcaster enables any/every citizen to bring any form of corruption to the notice of appropriate
authorities and the general public. Users can also report on things that need government intervention

## Getting Started

> [[Technologies](#technologies-used) &middot; [Testing Tools](#testing-tools) &middot; [Installations](#installations) &middot; [API Endpoints](#api-endpoints) &middot; [Tests](#tests) &middot; [Author](#author)


## Technologies Used

[node]: (https://nodejs.org)

- [Node.js](node)
- [Express.js](https://expressjs.com).
- [ESLint](https://eslint.org/).
- [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb).

## Testing Tools

- [Mocha](https://mochajs.org/).
- [Chai](https://chaijs.com).

## Installations

#### Getting started

- You need to have Node and NPM installed on your computer.
- Installing [Node](node) automatically comes with npm.

#### Clone

- Clone this project to your local machine `https://github.com/Elvis-rugamba/broadcaster.git`

#### Setup

- Installing the project dependencies
  > Run the command below
  ```shell
  $ npm install
  ```
- Start your node server
  > run the command below
  ```shell
  $ npm start
  ```
- Use `http://localhost:3000` as base url for endpoints

## API Document

- Use `http://localhost:3000/api/v1/api-docs`

## Heroku

- Use `https://broadcaster-api.herokuapp.com` as base url for endpoints

- Use `https://broadcaster-api.herokuapp.com/api/v1/api-docs` for API document

## Githug pages

- Use ` https://elvis-rugamba.github.io/broadcaster/UI/`

## API Endpoints

| METHOD | DESCRIPTION                                     | ENDPOINTS                                  |
| ------ | ----------------------------------------------- | ------------------------------------------ |
| POST   | Create user account                             | `/api/v1/auth/signup`                      |
| POST   | Login a user                                    | `/api/v1/auth/signin`                      |
| GET    | Fetch all ​red-flag ​records                      | `/api/v1/red-flags`                        |
| POST   | Create a red-flag ​record                        | `/api/v1/red-flags`                        |
| GET    | Fetch a specific ​red-flag ​record                | `/api/v1/red-flags/:redFlagId`             |
| PATCH  | Edit a specific red-flag record                 | `/api/v1/red-flags/:redFlagId`             |
| PATCH  | Edit the location of a specific red-flag record | `/api/v1/red-flags/:redFlagId/location`    |
| PATCH  | Edit the comment of a specific red-flag record  | `/api/v1/red-flags/:redFlagId/comment`     |
| PATCH  | Edit the status of a specific red-flag record   | `/api/v1/red-flags/:redFlagId/status`      |
| DELETE | Delete a specific red flag record               | `/api/v1/red-flags/:redFlagId`             |


## Tests

- Run test for all endpoints
  > run the command below
  ```shell
  $ npm run test
  ```


## Author

- Elvis Rugamba
   email: elvisrugamba@gmail.com  
