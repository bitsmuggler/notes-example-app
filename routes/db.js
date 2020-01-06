// Data Access acc. https://www.mongodb.com/blog/post/the-modern-application-stack-part-2-using-mongodb-with-nodejs

// db.js represents a thin wrapper on top of the MongoDB driver library

let MongoClient = require('mongodb').MongoClient;

function DB() {
    this.db = null;
}

DB.prototype.connect = function(uri) {

	// Connect to the database specified by the connect string / uri
	
	// Trick to cope with the fact that "this" will refer to a different
	// object once in the promise's function.
	var _this = this;
	
	// This method returns a javascript promise (rather than having the caller
	// supply a callback function).

	return new Promise(function(resolve, reject) {
		if (_this.db) {
			// Already connected
			resolve();
		} else {
			var __this = _this;
			
			// Many methods in the MongoDB driver will return a promise
			// if the caller doesn't pass a callback function.
			MongoClient.connect(uri)
			.then(
				function(database) {
					
					// The first function provided as a parameter to "then"
					// is called if the promise is resolved successfuly. The 
					// "connect" method returns the new database connection
					// which the code in this function sees as the "database"
					// parameter

					// Store the database connection as part of the DB object so
					// that it can be used by subsequent method calls.

					__this.db = database;

					// Indicate to the caller that the request was completed succesfully,
					// No parameters are passed back.

					resolve();
				},
				function(err) {

					// The second function provided as a parameter to "then"
					// is called if the promise is rejected. "err" is set to 
					// to the error passed by the "connect" method.

					console.log("Error connecting: " + err.message);

					// Indicate to the caller that the request failed and pass back
					// the error that was returned from "connect"

					reject(err.message);
				}
			)
		}
	})
}


DB.prototype.close = function() {
	
	// Close the database connection. This if the connection isn't open
	// then just ignore, if closing a connection fails then log the fact
	// but then move on. This method returns nothing – the caller can fire
	// and forget.

	if (this.db) {
		this.db.close()
		.then(
			function() {},
			function(error) {
				console.log("Failed to close the database: " + error.message)
			}
		)	
	}
}

