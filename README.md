# Repo Dashboard

## Requirements

- See front-end repos update in real-time
- Vote on those repos
- Check that the same email doesn't vote twice
- Check that the same browser session doesn't have multiple voters

## Ongoing Development (main notes, code snippets)

### [Trello](https://trello.com/b/7BskCx0p/best-frontend-repo)

## Technology

- Create React App
- Eslint and Prettier
- Fetch
- Github API V3

## [Backend tech](https://github.com/JackHowa/repo-dashboard-backend)

- Mongodb atlas
- Mongoose
- Express

## How To Run

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Challenges

- Overcoming rate limits without using server-to-server communication
- Getting vote counts from one api route, without updating all children components
