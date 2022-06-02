-- create column entries identical to the country csv file 
-- import data from country csv file (import from table plus literally right click & import)
-- create column entries identical to the cities csv file 
-- import data from cities csv file
-- create cities table
--create countries table
-- write query to copy data from imported over to the desired countries table format
-- write query to copy data from imported over to the desired cities table format

DROP TABLE IF EXISTS countries_import;
CREATE TABLE countries_import (
  abbrev TEXT NOT NULL,
  country TEXT NOT NULL 
);

DROP TABLE IF EXISTS cities_import;
CREATE TABLE cities_import (
  country TEXT NOT NULL,
  accent_city TEXT NOT NULL,
  population INTEGER,
  latitude FLOAT,
  longitude FLOAT
);

DROP TABLE IF EXISTS countries;
CREATE TABLE countries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  country TEXT NOT NULL,
  visited BOOLEAN DEFAULT false,
  would_visit BOOLEAN
);

INSERT INTO countries (country)
  SELECT country
  FROM countries_import;

DROP TABLE IF EXISTS cities; 
  CREATE TABLE cities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  city TEXT NOT NULL,
  country_id INTEGER,
  visited BOOLEAN DEFAULT false,
  would_visit BOOLEAN,
  blacklist BOOLEAN DEFAULT false
  );

INSERT INTO cities (city, country_id)
  SELECT accent_city, countries.id
  FROM cities_import
  JOIN countries ON countries.country = cities_import.country;
