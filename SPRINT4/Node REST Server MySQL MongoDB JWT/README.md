Read and change data in /src/config.js file to your chosen server port and database configuration for both MuSQL and MongoDB databases.

Run: npm i && npm start

Perform a POST request (no body data required) to http://localhost:PORT/login/ to get a JWT (being PORT your port configured in /src/config.js).
This "received token" will allow you access for 30 minutes to all routes specified in the exercise.

( When using Postman, insert this token in the "Token" field of "Authorization" menu with "Bearer token" type selected, i.e. in your Headers requests use a key-value pair -> "Authorization" : Bearer "token received" )


##### About specified routes in the exercise:

POST: /players -> needs a json attached in the body request as { "name" : _"new username"_ }

PUT: /players -> needs a json attached in the body request as { "old_name" : _"existing user name"_, "new_name": _"new name"_ }

POST /players/{id}/games/ --> as not specified, no body data required

