# Email Service App

> Front-end web application for Email Service

## How to run the application

### Prerequisites
* [NodeJS](https://nodejs.org/en/download) version 8.9.4 or higher
* [GIT](https://git-scm.com/downloads)

### Steps
1. Clone the project
``` bash
git clone https://github.com/ramirezag/email-service-app
cd email-service-app
```
2. Install the dependencies
``` bash
  npm install
```
3. Inside the project, create .env file and set API_BASE_URL
``` bash
cat echo "API_BASE_URL=http://localhost:3000/api" > .env // Replace API_BASE_URL value to the value of where you deployed the email-service-api
```
4. Serve with hot reload at localhost:8080
``` bash
npm run dev
```

#### Other commands
* Build for production with minification. This will generate dist folder. Use [Serve](https://www.npmjs.com/package/serve) or put the dist folder at the root of any server.
``` bash
npm run build
```
* Run unit tests
``` bash
npm run unit
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

#### TODO:
- Use chips in email representation
- Implement lazy loading (https://router.vuejs.org/en/advanced/lazy-loading.html)
- Use store pattern - see Vuex. Replace this.$parent calls
- Study how to separate presentational and container components in Vue. Check https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0 for details about the topic.
