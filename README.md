# Internship-Assignment


#### _**IMPORTANT NOTE**_ - 


## Getting Started
This repository aims to assist you in beginning work on a MERN stack application with a solid file structure as a foundation. To get started make a copy of this template repo.

Since this project will hold both the client application and the server application there will be node modules in two different places. First run `npm install` from the backend folder. After this you will run `npm install` from the frontend folder

## File structure
#### `frontend` - Holds the client application
- #### `public` - This holds all of static files
- #### `src`
    - #### `assets` - This folder holds assets such as images, docs, and fonts
    - #### `components` - This folder holds all of the different components that will make up views
    - #### `pages` - These represent a unique page on the website i.e. Home or Users. These are still normal react components.
    - #### `store` - In here store logged users cradentials and necessary datas.
    - #### `utils` - In here store all utility files such as axios, alert so on.
    - #### `index.js` - This is what renders the react app by rendering all the Routes, should not change
- #### `package.json` - Defines npm behaviors and packages for the client
#### `backend` - Holds the server application
- #### `db` - This holds our db configuration files, like mongoDB uri
- #### `controllers` - These hold all of the callback functions that each route will call
- #### `models` - This holds all of our data models
- #### `routes` - This holds all of our HTTP to URL path associations for each unique url
- #### `errors` - This holds all of error handling functions
- #### `middleware` - This holds all of error handler middleware and aunthenticater middleware
- #### `app.js` - Defines server connection, db connection and use necessary liabraries 
#### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README
#### `.gitignore` - Tells git which files to ignore
#### `README` - This file!


## Available Scripts

In the project first you will run express server in backend folder:

### `npm start`

Then you will run frontend react server in frontend folder:

### `npm start`

Runs both the client app and the server app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.


### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

If deploying to heroku this does not need to be run since it is handled by the heroku-postbuild script<br>

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn how to setup a local MongoDB instance for testing, check out how to [Connect to MongoDB](https://docs.mongodb.com/guides/server/drivers/).

To learn how to deploy a full-stack web app to heroku, check out [this great guide](https://daveceddia.com/deploy-react-express-app-heroku/).

To learn React, check out the [React documentation](https://reactjs.org/).

### `npm run build` fails to minify

