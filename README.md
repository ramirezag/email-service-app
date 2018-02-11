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
* Build for production with minification. Verify first if `API_BASE_URL` in .env points to where [Email Service API](https://github.com/ramirezag/email-service-api) is deployed. 
Then execute the command below. This will generate dist folder. Use [Serve](https://www.npmjs.com/package/serve) or put the dist folder at the root of any server.
``` bash
npm run build
```
* Run unit tests
``` bash
npm run unit
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## How to build a docker image and run a docker container

### Prerequisites
* [Docker CE](https://docs.docker.com/install) 
* [GIT](https://git-scm.com/downloads)

### Steps to build a docker image

1. Clone the project
``` bash
git clone https://github.com/ramirezag/email-service-app
cd email-service-api
```

2. Build a docker image by executing - `sudo docker build -t <repo_name>/email-service-app .`

   Eg.
   ```bash
   sudo docker build -t ramirezag/email-service-app .
   ```

### Steps to run a docker container

1. Run the container by executing - `sudo docker run -d -p 8080:8080 -e API_BASE_URL=<api_url> --name email-service-app ramirezag/email-service-api`. Where `<api_url>` is the base api url of running [Email Service API](https://github.com/ramirezag/email-service-app). You can omit `-e API_BASE_URL=<api_url>` if [Email Service API](https://github.com/ramirezag/email-service-app) is running locally at port 3000.

   Eg.
   ```bash
   sudo docker run -d -p 8080:8080 -e API_BASE_URL=http://52.89.255.98:3000/api --name email-service-app ramirezag/email-service-app
   ```

   **Note(s)**
   
   I already built a docker image for this project. You can grab and run it by executing
   ```bash
   sudo docker pull ramirezag/email-service-app
   sudo docker run -d -p 8080:8080 -e API_BASE_URL=http://52.89.255.98:3000/api --name email-service-app ramirezag/email-service-app
   ```

#### TODO:
- Use chips in email representation
- Implement lazy loading (https://router.vuejs.org/en/advanced/lazy-loading.html)
- Use store pattern - see Vuex. Replace this.$parent calls 
