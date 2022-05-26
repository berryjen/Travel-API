-- populate more data into the country & city tables (visited, haven't visited, don't want to visit again)
-- create city table with data constraints
-- move country & ethnic & % of ethnicities in another table
-- write a query that returns all cities that i haven't been to in countries id visit again (ie. madrid)
-- import data containing all countries & cities in the world 
-- (aggregation) write a query that will return the % of the countries I've been to
   -- part 2) (limit) return the % of the cities in a country I've been to (ie: % of citieis in England visited)
-- (random) return a city to visit next (but not one where i've visited already)
-- remove countries column from cities table 
-- re name the join query 
DROP TABLE IF EXISTS countries;
CREATE TABLE countries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  country TEXT NOT NULL UNIQUE,
  visited BOOLEAN DEFAULT false,
  would_visit BOOLEAN
);
INSERT INTO countries (country, visited, would_visit) VALUES ('Spain', true, true); 
INSERT INTO countries (country, visited, would_visit) VALUES ('Croatia', true, true);
INSERT INTO countries (country, would_visit) VALUES ('Saudi Arabia', false);
INSERT INTO countries (country, would_visit) VALUES ('North Korea', false);
INSERT INTO countries (country, would_visit) VALUES ('Peru', true);
INSERT INTO countries (country, visited, would_visit) VALUES ('Portugal', true, true);
INSERT INTO countries (country, visited, would_visit) VALUES ('Germany', true, true);

DROP TABLE IF EXISTS cities;
CREATE TABLE cities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  city TEXT NOT NULL,
  country_id INTEGER,
  country TEXT NOT NULL,
  visited BOOLEAN DEFAULT false,
  would_visit BOOLEAN,
  blacklist BOOLEAN DEFAULT false
  );
  INSERT INTO cities (city, country, visited, would_visit) VALUES ('Madrid', 'Spain',false, null);
  INSERT INTO cities (city, country, visited, would_visit) VALUES ('San Sebastian', 'Spain', true, true);
  INSERT INTO cities (city, country, visited, would_visit) VALUES ('Zagreb', 'Croatia', true, false);
  INSERT INTO cities (city, country, visited, would_visit) VALUES ('Split', 'Croatia', true, true);
  INSERT INTO cities (city, country, would_visit, blacklist) VALUES ('Riyadh', 'Saudi Arabia', false, true);
  INSERT INTO cities (city, country, would_visit, blacklist) VALUES ('Pyongyang', 'North Korea', false, true);
  INSERT INTO cities (city, country, would_visit) VALUES ('Lima', 'Peru', true);
  INSERT INTO cities (city, country, visited, would_visit) VALUES ('Lisbon', 'Portugal', true, true);
  INSERT INTO cities (city, country, would_visit) VALUES ('Nazare', 'Portugal', true);
  INSERT INTO cities (city, country, visited, would_visit) VALUES ('Berlin', 'Germany', true, false);

SELECT *
FROM cities
WHERE visited = false
  AND would_visit = true;

SELECT *
FROM cities
JOIN countries ON countries.country = cities.country
WHERE cities.visited = false
AND countries.visited = true
AND countries.would_visit= true;

SELECT visited,
  100* COUNT(country) / (SELECT COUNT(country) FROM countries) AS 'percentage' 
FROM countries
WHERE visited = true
GROUP BY visited;
  
SELECT *
FROM cities
  WHERE visited= false
    AND blacklist= false
  ORDER BY RANDOM()
  LIMIT 1;

SELECT *
FROM cities;

SELECT * 
FROM countries;

SELECT cities.id, cities.city, cities.country_id, countries.country, countries.id AS country_id
FROM cities
JOIN countries ON countries.country = cities.country
WHERE cities.visited = false;

UPDATE
	cities
SET
	country_id = (
		SELECT
			id
		FROM
			countries
		WHERE
			cities.country = countries.country);
