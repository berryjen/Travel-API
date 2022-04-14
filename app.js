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
create mental data structure on separate file
*/
app.get("/", (req, res) => {
  res.json ([{
      country: "Spain",
      },
      {
      country: "Nicaragua",
      },
      {
      country: "Chile",
      },
      {
      country: "Croatia",
      },
      {
      country: "Colombia",
      },
      {
      country: "Argentina",
      },
      {
      country: "Morocco",
      },
      {
      country: "Japan",
      },
      {
      country: "Turkey",
      },
      {
      country: "Australia",
    }
  ]);
});  

app.get('/country', (req, res) => {
   res.json([{
     country: "Spain",
   },
   {
     city: "San Sebastian",
   },
   {
     city: "Barcelona",
   },
   {
     city: "Cordoba",
   },
   {
     city: "Granada",
   },
   {
     city: "Nerja",
   },
   {
     city: "Seville",
   },
   {
     city: "Malaga",
   },
   {
     city: "Marbella",
   },
   {
     city: "Mallorca"
   },
   {
     country: "Nicaragua",
   },
   {
   city: "Leon",
   },
   {
    city: "San Juan del Sur",
   },
   {
     country: "Chile",
   },
   {
     city: "none",
   },
   {
     country: "Croatia",
   },
   {
     city: "Rijeka",
   },
   {
     city: "Novalija",
   },
   {
     city: "Zadar",
   },
   {
     city: "Sibenik",
   },
   {
     city: "Split",
   },
   {
     city: "Makarska",
   },
   {
     city: "Dubrovnik",
   },
   {
     country: "Colombia",
     city: "none",
   },
   {
     country: "Argentia",
     city: "none",
   },
   {
     country: "Morocco",
   },
   {
     city: "Fes",
   },
   {
     city: "Rabat",
   },
   {
     city: "Merzouga",
   },
   {
     city: "Marrakech",
   },
   {
     country: "Japan",
   },
   {
     city: "Tokyo",
   },
   {
     city: "Osaka",
   },
   {
     city: "Kyoto",
   },
   {
     city: "Kumayama",
   },
   {
     country: "Turkey",
   },
   {
     city: "none",
   },
   {
     country: "Australia",
   },
   {
     city: "none",
   }
  ]);
});

app.get('/country/city', (req, res) => {
   res.json({
     name: "Madrid",
     visited: false,
     name: "Barcelona",
     visited: true,
     name: "Chefchaouen",
     visited: false,
     name: "Makarska",
     visited: true,
     name: " Santiego",
     visited: false,
     name: "Buenos Aires",
     visited: false,
     name: "Okinawa",
     visited: false,
   });
});

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

