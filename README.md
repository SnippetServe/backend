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

### Authentication
You can get your API key by making a request to the signin route and then send the API Token as a Bearer token as indicated below:
`Authorization: Bearer <API-TOKEN>` Pass this in the header

### Snippets
1. `GET` `/api/snippets` : Get one specific snippet with a `uuid`

    The request should look like this:    
    ```
    {
        "uuid": "c2d6c07d-cef1-4bfd-ba44-6a732ae6cea5"
    }
    ```

    The expected response should look like this:
    ```
    {
        "snippet": {
            "uuid": "efa3de67-3459-48df-92d3-8a8c17bd91c8",
            "createdAt": "2020-09-06T08:34:12.171Z",
            "updatedAt": "2020-09-06T08:55:27.046Z",
            "description": "Sample",
            "private": false,
            "tags": "python",
            "downvotes": 0,
            "upvotes": 0,
            "lang": "Python",
            "code": "print(\"Hi\")",
            "userUUID": "679031cd-f3a7-48b1-a765-528f37cf2018"
        }
    }
    ```
2. `POST` `/api/snippets` : Create a new snippet 
   
    The request should look like this:    

    ```
    {
        "description": "Sample",
        "isPrivate": "False",
        "tags": "",
        "lang": "Python",
        "code": "print(\"Hi\")"
    }
    ```
    The snippet would be created under the current user

    The expected response should look like this:
    ```
    {
        "snippet": {
            "description": "Sample",
            "private": "False",
            "tags": "",
            "downvotes": 0,
            "upvotes": 0,
            "lang": "Python",
            "code": "print(\"Hi\")",
            "userUUID": "679031cd-f3a7-48b1-a765-528f37cf2018",
            "uuid": "c2d6c07d-cef1-4bfd-ba44-6a732ae6cea5",
            "createdAt": "2020-09-06T09:14:27.245Z",
            "updatedAt": "2020-09-06T09:14:27.245Z"
        }
    }
    ```

3. `PUT` `/api/snippets` : Updates the snippet with the provided values. 

    The request should contain all the fields of the snippet (ideally get the snippet first and then update) and should look something like this:
    ```
    {
        "description": "Sample",
        "isPrivate": "False",
        "tags": "",
        "lang": "Python",
        "code": "print(\"Hi! This is a update!\")"
    }
    ```

    The expected response should look like this:
    ```
    {
        "snippet": {
            "description": "Sample",
            "private": "False",
            "tags": "",
            "downvotes": 0,
            "upvotes": 0,
            "lang": "Python",
            "code": "print(\"Hi! This is a update!\")",
            "userUUID": "679031cd-f3a7-48b1-a765-528f37cf2018",
            "uuid": "c2d6c07d-cef1-4bfd-ba44-6a732ae6cea5",
            "createdAt": "2020-09-06T09:14:27.245Z",
            "updatedAt": "2020-09-06T09:14:27.245Z"
        }
    }
    ```

4. `DELETE` `/api/snippets` : Delete the snippet with the provided `uuid`

    The expected request should look something like this:
    ```
    {
        "uuid":"c2d6c07d-cef1-4bfd-ba44-6a732ae6cea5"
    }
    ```

    The expected response should look like this:
    ```
    {
        "msg": "snippet deleted"
    }
    ```

### User 

1. `POST` `/api/login` : Checks the authenticity of the entered values and then returns a signed JWT token

    The expected request should look something like this:
    ```
    {
        "username": "My username",
        "password": "My secret password"
    }
    ```

    The expected response (after successfull verification) should look like this:
    ```
    {
        "token": "<API-TOKEN>"
    }
    ```

    Error messages would be added soon!

2. `POST` `/api/signup` : Creates a new user or errors out if the user already exists. Once created, a signed JWT Token is returned

    The expected request should look something like this:
    ```
    {
        "username": "My custom username",
        "password": "My custom password",
        "email": "username@domain.com",
        "description": "This is my bio"
    }
    ```

    The expected response looks like this:
    ```
    {
       "token": "<API-TOKEN>" 
    }
    ```

More API endpoint docs would be available soon 😍 

## License

Please take a look at [Our License](LICENSE)
