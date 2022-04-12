const express = require('express')
const app = express()
const port = 3000

app.get('/array', (req, res) => {
  res.json ([{
    name: "country 1",
    visited: true,
  },
  {
    name: "country 2",
    visited: false,
  },
  {
    name: "country 3",
    visited: true,
  }
  ]);
});

/* 
/  : responds with list of all countries in the world
/country: list of cities within the country object
/country/city: responds with city object with "visited" property included

*/
app.get('/uk', (req, res) => {
   res.json({
     name: "England",
     visited: true
   });
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
