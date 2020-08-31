# SnippetServe backend

This is the backend repository of SnippetServe, a place for developers to share and re-use code snippets with ease

Built with:
🔥 [NodeJs]()
🔥 [ReactJs]()

## How to run?
Note: You might also need to get the [frontend repo]()
1. Clone this repo `git clone https://github.com/SnippetServe/backend`
2. Install all the packages required: `yarn install`
3. Create a new file under root of this project called `.env`. Add properties as mentioned in `.env.example`. For some of these you might have to install external software like postgres or redis etc.
4. Now run `yarn devRun`, this will start nodemon as well, so even if you change any code, it will automatically compile.
5. For production use ```yarn start```

## License
Please take a look at [Our License](LICENSE)

## Contributing

* Clone this repo.
* Run `yarn install` to install all dependencies.
* Create a new branch named `trello-id/feature`. For example `235x53/oauth-implementation`
* After you have made changes, make sure that `yarn lint` and `yarn build` doesn't throw any errors and `yarn devRun` works as expected.
* If `yarn lint` throws any errors you can autofix most of these errors by running `yarn lintFix`. If errors persist even after this, then you have to manually fix these. You can use vscode to do so. Just hover over the error and vscode will show you a suggestion(`ctrl + .` also works on windows).
* Now commit your changes and push to the above branch that you created and then raise a PR to master.
* You will need at least 2 approvals before your changes get merged into master.

🐛 Found a issue or bug? Feel free to open a [issue]() 😃 
🔥 Have a feature in mind? Feel free to submit a [pull request]() 😇 