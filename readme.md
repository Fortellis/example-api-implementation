This is a sample API project created to showcase how to onboard an existing API in Fortellis.

This project depends on below tech stack

* node.js, express server
* SQL server 2017-latest
* Dockerize and get ready for deployment

### Local development
Make sure you have latest version of docker installed and running.
#### SQL Server
* download official docker image & update your password below

    * `docker pull mcr.microsoft.com/mssql/server:2017-latest`

    * `docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=P@ssw0rd" -p 1433:1433 --name sql1 -d mcr.microsoft.com/mssql/server:2017-latest`

* check if docker container is running
    * `docker ps`
#### API
* `nvm use 9.0`
* `npm install`
* __Update config.json with appropriate sql server credentials__
* `npm run build`
* `npm run dev`

    __You should see the API server running on localhost port 8080__
### APIs supported
* __You could reference the API specification under Spec/my-users-api.yaml__

* Endpoints
    * Functional endpoints
        * GET /health - health endpoint
        * GET /v1/users - to get all users
        * GET /v1/user/{id} - to get a user by Id
        * POST /v1/user - to create new user
        * POST /v1/match - match/find users by firstname, lastname and other parameters
    * Administrative endpoints
        * POST /v1/activate - to activate your API consumer
        * POST /v1/deactivate/{connectionId} - to deactivate an existing API consumer

### Dockerize
* npm run build
* docker build -t geonosis:latest .
* docker run -p 8080:8080 geonosis:latest


