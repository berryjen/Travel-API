const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

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
*/


app.get('/', (req, res) => {
  res.json(world)
});


app.get('/:country', (req, res) => {
  var result = world.countries.find(obj => {
    return obj.name === req.params.country
  })
  res.json(result)
});

app.get('/:country/:city', (req, res) => {
  var result = world.countries.find(obj => {
    return obj.name === req.params.country
  })
  if (result === undefined ){
    res.send ("country not found")
    return 
  }
  var city = result.cities.find(obj => {
    return obj.name === req.params.city
  })
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
