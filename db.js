//decide on the size of the table (# of colums, rows, value type that goes into each)
//transform country and city objects/properties into excel. 
// look into how to create a table using SQLite

// 6/1/2022
//write query to return all countries
  // --> change SELECT query; what from what (country from countries table)
  // console.log(row.country)
  // return a list of cities from Tunisia from new db.each that will display on con
  // return all cities
  // return all cities from any country
  // return all cities from the given country (possible documentation look-up)
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('lorem.db')
const requested_country= 'Tunisia'

db.serialize(() => {
  db.each('SELECT rowid AS id, info FROM lorem', (err, row) => {
    console.log(`${row.id}: ${row.info}`)
  })
  //db.each
})

db.close()
