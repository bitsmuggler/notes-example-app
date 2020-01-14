# notes-example-app 

_Playground to learn Node.js Basics & REST architecture paradigm_

## Parts

* Exemplary In-Memory note management as RESTful API (``master-branch``)
* Persistent note management as RESTful API (``mongodb-branch``)
* Web UI & RESTful API note management in VanillaJS (``frontend-starter-vanillajs``)

## Run examples

### Running Node.js Backend

1. Create a .env file with the connection string your MongoDB
    * Variable: ``MONGODB_CONNECTIONSTRING``
1. Install dependencies ``npm install```
1. Run server
    * ```npm run server``` or
    * Use nodemon: ``npx nodemon start``
1. Access your API via: ```http://localhost:3000```

### Running Frontend
_Only on branch: ```frontend-starter-vanillajs```_

1. Make sure your backend is running
1. Run the frontend webserver via gulp: ```npm run webserver``
1. Access your frontend via Browser: ```http://localhost:8000```