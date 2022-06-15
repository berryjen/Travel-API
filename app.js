const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('lorem.db')
const requested_country = 'Portugal'

//file reading begins
var world= {}
try {
  const data = fs.readFileSync('./data.json');
  world = JSON.parse(data);
}

catch (err) {
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

create db.all to return a specifc country & city
then to build on top of that, return (SELECT) all the useful cities table columns
fix error handling in '/' 
*/

/*
'/' returns all countries from database
500 response returned if there's an error on the serer side
404 returned if no country in the database found
*/
app.get('/', (req, res) => {
  db.all('SELECT country FROM countries',
    function(err, rows) {
      if (err) {
          console.log(err)
          res.status(500).send("An error occurred here")
          res.status(404).send("page not found")
         }
         else {
          res.json(rows)
         }
    } 
  )
});


app.get('/:country', (req, res) => {
  db.all('SELECT city, country FROM cities JOIN countries ON cities.country_id = countries.id WHERE country= ?', req.params.country, 
    (err, rows) => {
      if(err) {
        console.log(err)
        res.status(500).send("An error occurred here")
      }
      else if (rows.length === 0) {
        res.status(404).send("Country not found")
      }
      else {
        res.json(rows)
      }
    }    
  ) 
}); 

app.get('/:country/:city', (req, res) => {
  var result = world.countries.find(obj => {
    return obj.name === req.params.country
  })
  if (result === undefined ){
    res.status(404).sendFile("/absolute/path/to/404.png")
    return 
  }
  var city = result.cities.find(obj => {
    return obj.name === req.params.city
  })
  if (city === undefined){
    res.status(404).sendFile("/absolute/path/to/404.png")
    return 
  }
  res.json(city)
});

app.get('/uk', (req, res) => {
   res.json({
     name: "England",
     visited: true
   })
});

app.get("/hello", (req, res) => {
  res.send ("hello")
});

app.get("/hello/:name", (req, res) => {
  res.send ("hello " + req.params.name)
});

app.listen(port, () => 
{
  console.log(`Example app listening on port ${port}`)
})
