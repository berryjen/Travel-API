const express = require('express');
const fs = require('fs');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('world.db');
const requested_country = 'Portugal';

//file reading begins
var world = {};
try {
	const data = fs.readFileSync('./data.json');
	world = JSON.parse(data);
} catch (err) {
	console.log(`Error reading file from disk: ${err}`);
}

/* 
/  : responds with list of all countries in the world
/country: list of cities within the country object
/country/city: responds with city object with "visited" property included
create mental data structure on separate file
create a new function that returns city
within /:country/:city, create a return that will display correct status code
ie) part 1) 404 country not found
res._____
part 2) return 404 city not found
gave a blank page (when the city hasnt been populated in the database)

create db.all to return all cities
*/

/*
'/' returns all countries from database
500 response returned if there's an error on the server side
404 returned if no country in the database found

create db.all to return a specifc country & city
then to build on top of that, return (SELECT) all the useful cities table columns
fix error handling in '/' 

collapse or comment out app.get (":country/:city")/ move /info under (":country/:city")
add additional column to /:country 
post request allows for updates. 
  --> user puts in an update request
  --> app.post talks to database and asks it to update

implement additional SELECT quires to handle combinations of query string params 
--> ex) query = 'SELECT country FROM countries WHERE visited = true & would_visit = true'
create new app.post('/:country/visited')
--> what is the json obj going to be sent?

concatenate blacklist to the query string
debug why the result shows empty array

consolidate IF & query string parameter filters to app.get('/:country')
--> apply visited, would_visit to the list of cities
app.post
--> to not manually update info on the database
--> have the function do the work
error handling for app.get('/')
--> for unexpected values
--> which error code to return
ex) ?visited=France 

*/
app.use(express.json());

app.get('/', (req, res) => {
	var visited_query = 'NOT NULL';
	if (req.query.visited === 'true') {
		visited_query = 'true';
	} else if (req.query.visited === 'false') {
		visited_query = 'false';
	}

	var would_visit_query = 'NULL OR would_visit IS NOT NULL';
	if (req.query.would_visit === 'true') {
		would_visit_query = 'true';
	} else if (req.query.would_visit === 'false') {
		would_visit_query = 'false';
	}

	var blacklisted_query = 'NOT NULL';
	if (req.query.blacklisted === 'true') {
		blacklisted_query = 'true';
	} else if (req.query.blacklisted === 'false') {
		blacklisted_query = 'false';
	}

	query =
		'SELECT country FROM countries WHERE visited IS ' +
		visited_query +
		' AND (would_visit IS ' +
		would_visit_query +
		') AND blacklisted IS ' +
		blacklisted_query;

	console.log(query);

	db.all(query, function(err, rows) {
		if (err) {
			console.log(err);
			res.status(500).send('An error occurred here');
		} else if (rows.length === 0) {
			res.status(404).send('Countries not found');
		} else {
			res.json(rows);
		}
	});
});

function validate(req) {
	return new Promise((resolve) => {
		console.log('validate request');
		if (req.query.visited !== undefined) {
			validateBoolean(req.query.visited);
		}

		if (req.query.would_visit !== undefined) {
			validateBoolean(req.query.would_visit);
		}

		if (req.query.blacklisted !== undefined) {
			validateBoolean(req.query.blackisted);
		}
		resolve(req);
		//can it be an empty param?
	});
}

function query_db(query, country) {
	console.log('query_db');
	return new Promise((resolve) => {
		db.all(query, country, (err, rows) => {
			if (err) {
				throw err;
			} else {
				resolve(rows);
			}
		});
	});
}

function get_country(req) {
	return new Promise((resolve, reject) => {
		var query = 'SELECT country from countries WHERE country = ?';
		var country = req.params.country;
		db.get(query, country, (err, row) => {
			if (err) {
				throw err;
			} else {
				console.log(row);
				if (row === undefined) {
					var err = new Error(`Country given is not valid: ${country}`);
					err.status = 404;
					reject(err);
				} else {
					resolve(req);
				}
			}
		});
	});
}

app.get('/v2/:country', (req, res, next) => {
	validate(req)
		.then((req) => {
			return get_country(req);
		})
		.then((req) => {
			var would_visit_city_query = 'NULL OR cities.would_visit IS NOT NULL';
			if (req.query.would_visit === 'true') {
				would_visit_city_query = 'true';
			} else if (req.query.would_visit === 'false') {
				would_visit_city_query = 'false';
			}
			var visited_city_query = 'NOT NULL';
			if (req.query.visited === 'true') {
				visited_city_query = 'true';
			} else if (req.query.visited === 'false') {
				visited_city_query = 'false';
			}

			city_query =
				'SELECT city, country FROM cities JOIN countries ON cities.country_id = countries.id WHERE country = ? AND cities.visited IS ' +
				visited_city_query +
				' AND ( cities.would_visit IS ' +
				would_visit_city_query +
				')';
			return { query: city_query, country: req.params.country };
		})
		.then((val) => {
			return query_db(val.query, val.country);
		})
		.then((data) => {
			res.status(200).json(data);
		})
		.catch(next);
});

app.get('/:country/:city', (req, res) => {
	/* TODO: check if country actually exists 
          check if country is blacklisted */
	db.all(
		'SELECT city AS name, country, cities.visited, cities.would_visit FROM cities JOIN countries ON cities.country_id = countries.id WHERE country= ? AND city = ?',
		req.params.country,
		req.params.city,
		(err, rows) => {
			if (err) {
				console.log(err);
				res.status(500).send('An error occurred here');
			} else if (rows.length === 0) {
				res.status(404).send('City not found');
			} else {
				res.json(rows);
			}
		}
	);
});

app.patch('/:country', (req, res) => {
	/* TODO: validate all values in request.body
  how to check if a property exists in JS
  how to reason about the situation where user input provided is only partial?
  --> support or don't support
  function abstraction
  */

	console.log(req.params.country, req.body);

	var boolean_errors = [];
	var visited = isValidBoolean(req.body.visited);
	if (visited === undefined) {
		boolean_errors.push('visited (required, boolean)');
	}

	var blacklisted = isValidBoolean(req.body.blacklisted);
	if (blacklisted === undefined) {
		boolean_errors.push('blacklisted (required, boolean)');
	}

	var would_visit = isValidBoolean(req.body.would_visit);
	if (would_visit === undefined) {
		boolean_errors.push('would_visit (required, boolean)');
	}

	if (boolean_errors.length > 0) {
		res.status(400).send('Validation failed : ' + boolean_errors.join(', '));
		return;
	}

	query = 'UPDATE countries SET visited = ?, would_visit = ?, blacklisted = ? WHERE country = ?';
	db.run(query, visited, would_visit, blacklisted, req.params.country, (err) => {
		if (err) {
			console.log(err);
			res.status(500).send('update unsuccessful');
		} else {
			res.status(202).send('accepted');
		}
	});
});

app.patch('/:country/:city', (req, res) => {
	console.log(req.params.country, req.params.city, req.body);

	var boolean_errors = [];
	var visited = isValidBoolean(req.body.visited);
	if (visited === undefined) {
		boolean_errors.push('visited (required, boolean)');
	}
	var would_visit = isValidBoolean(req.body.would_visit);
	if (would_visit === undefined) {
		boolean_errors.push('would_visit (required, boolean)');
	}

	if (boolean_errors.length > 0) {
		res.status(400).send('Validation failed : ' + boolean_errors.join(', '));
		return;
	}
	query =
		'UPDATE cities SET visited = ?, would_visit = ? WHERE cities.city = ? AND cities.country_id IN( SELECT id FROM countries WHERE country = ?);';

	console.log(query);

	db.run(query, visited, would_visit, req.params.city, req.params.country, (err) => {
		if (err) {
			console.log(err);
			res.status(500).send('update unsuccessful');
		} else {
			res.status(202).send('accepted');
		}
	});
});

app.use(function(err, req, res, next) {
	let data = {
		status: err.status || 500,
		message: err.message
	};
	console.log(err);
	res.status(err.status || 500);
	res.json(data);
});

function isValidBoolean(value) {
	if (value === 'true' || value === 'false') {
		return true;
	} else {
		return false;
	}
}

function validateBoolean(value) {
	let isValidBoolean_result = isValidBoolean(value);
	if (isValidBoolean_result !== true) {
		throw new SyntaxError(`Value given is not a valid Boolean: ${value}`);
	}
}

module.exports = app;
