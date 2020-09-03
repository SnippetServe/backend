# SnippetServe (backend) &middot; [![Github Actions](https://github.com/SnippetServe/backend/workflows/Deploy%20To%20Heroku/badge.svg)](https://github.com/SnippetServe/backend/actions) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/SnippetServe/backend/blob/master/LICENSE)

This is the backend repository of SnippetServe, a place for developers to share and re-use code snippets with ease

Made with:
🔥 [NodeJs]()
🔥 [ReactJs]()

## Installing / Getting started

Note: You can find the frontend in the [frontend repo](https://github.com/SnippetServe/frontend.git)

1. Clone this repo `git clone https://github.com/SnippetServe/backend`
2. Install all the packages required: `yarn install`
3. Create a new file under root of this project called `.env`. Add properties as mentioned in `.env.example`. You need a Postgres DB running.
4. Now run `yarn devRun`, this will start nodemon as well, so even if you change any code, it will automatically compile.
5. For production use `yarn start`

## Developing

### Backend Built With

- Typescript
- Nodejs
- Expressjs
- TypeORM
- Postgresql

### Prerequisites

- Clone or fork this repo.
- Run `yarn install` to install all dependencies.
- Create a .env file if it doesn't exist or change the existing one with your postgres db url.
- Pick up an issue or a card from the trello board (need to be added to access it). Create a new branch named `trello-id/feature`. For example `235x53/oauth-implementation`
- After you have made changes, make sure that `yarn lint` and `yarn build` doesn't throw any errors and `yarn devRun` works as expected.
- If `yarn lint` throws any errors you can autofix most of these errors by running `yarn lintFix`. If errors persist even after this, then you have to manually fix these. You can use vscode to do so. Just hover over the error and vscode will show you a suggestion(`ctrl + .` also works on windows).
- Now commit your changes and push to the above branch that you created and then raise a PR to master.
- You will need at least 2 approvals before your changes get merged into master.

🐛 Found a issue or bug? Feel free to open a [issue]() 😃

🔥 Have a feature in mind? Feel free to submit a [pull request]() 😇

## Versioning

We can maybe use [SemVer](http://semver.org/) for versioning. Coming soon.

## Configuration

All you need is the above-mentioned `.env` file. Create one and copy in the content from `.env.example`. Change the `DATABASE_URL` with your own database.
For development environment the `JWT_SECRET` can be the same as the example, for production change with an appropriate one.

## Tests

Coming soon?

## Api Reference

Coming soon a description of the api, including authentication methods as well as explaining all the endpoints with their required parameters.

## License

Please take a look at [Our License](LICENSE)
