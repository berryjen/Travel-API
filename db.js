//decide on the size of the table (# of colums, rows, value type that goes into each)
//transform country and city objects/properties into excel. 
// look into how to create a table using SQLite

// 6/1/2022
//write query to return all countries
  // --> change SELECT query; what from what (country from countries table)
  // console.log(country)
  // return a list of cities from Tunisia from new db.each that will display on con
  // return all cities with the =>  notation
  // return all cities from any country
  // return all cities from the given country (possible documentation look-up)
  
  // filter countries LIKE  (to get a partial match)
  // each API call has a different query in app.js......what sql query do I want to write to return a specfic country with a city found within it
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('lorem.db')
const requested_country= 'Tunisia'
const requested_city = 'Tunis'

db.serialize(() => {
  /*db.each('SELECT rowid AS id, info FROM lorem', (err, row) => {
    console.log(`${row.id}: ${row.info}`)
  }) */
  db.each('SELECT country FROM countries',
    function(err, row) {
      console.log(`${row.country}`)
    } 
  )
  db.each('SELECT city FROM cities', 
    (err, row) => {
      console.log(`${row.city}`)
    }
  ) 
    /* db.each('SELECT city, country FROM cities JOIN countries ON cities.country_id = countries.id WHERE country= ?', requested_country, 
    (err, row) => {
         if (err) {
          console.log(err)
         }
         else {
          console.log(`${row.country}: ${row.city}`)
         }
    }
   ) */
  /* db.each("SELECT city, country FROM cities JOIN countries ON cities.country_id = countries.id WHERE country LIKE'%land'",
    (err, row) => {
         if (err) {
          console.log(err)
         }
         else {
          console.log(`${row.country}: ${row.city}`)
         }
    }
  ) */
   db.each('SELECT * FROM cities JOIN countries ON cities.country_id = countries.id WHERE country = ? AND city = ?', requested_country, requested_city,
    (err, row) => {
         if (err) {
          console.log(err)
         }
         else {
          console.log(`${row.country}: ${row.city}`)
         }
    }
   ) 
})
db.close()

