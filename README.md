# notes-example-app 

_Playground to learn Node.js Basics & REST architecture paradigm_

## Parts

* Exemplary In-Memory note management as RESTful API (Branch: ``master``)
* Persistent note management as RESTful API (Branch: ``mongodb``)
* Web UI & RESTful API note management in VanillaJS (Branch: ``frontend-starter-vanillajs``)

## Prerequisites

1. Create a MongoDB Database with the name ``notes-example-app```
1. Create a collection in the db with the name ``notebooks``

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
1. Run the frontend webserver via gulp: ``npm run webserver``
1. Access your frontend via Browser: ```http://localhost:8000```
