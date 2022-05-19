-- populate more data into the country & city tables (visited, haven't visited, don't want to visit again)
-- create city table with data constraints
-- move country & ethnic & % of ethnicities in another table
-- write a query that returns all cities that i haven't been to in countries id visit again (ie. madrid)
-- import data containing all countries & cities in the world 
-- (aggregation) write a query that will return the % of the countries I've been to
   -- part 2) (limit) return the % of the cities in a country I've been to (ie: % of citieis in England visited)
-- (random) return a city to visit next (but not one where i've visited already)

DROP TABLE IF EXISTS countries;
CREATE TABLE countries (
  country TEXT PRIMARY KEY,
  visited BOOLEAN DEFAULT false,
  would_visit BOOLEAN
);
INSERT INTO countries (country, visited, would_visit) VALUES ('Spain', true, true); 
INSERT INTO countries (country, visited, would_visit) VALUES ('Croatia', true, true);
INSERT INTO countries (country, visited, would_visit) VALUES ('Saudi Arabia', false, false);
INSERT INTO countries (country, visited, would_visit) VALUES ('North Korea', false, false);
INSERT INTO countries (country, visited, would_visit) VALUES ('Peru', false, true);
INSERT INTO countries (country, visited, would_visit) VALUES ('Portugal', true, true);
INSERT INTO countries (country, visited, would_visit) VALUES ('Germany', true, true);

DROP TABLE IF EXISTS cities;
CREATE TABLE cities (
  city TEXT,
  country TEXT,
  visited BOOLEAN DEFAULT false,
  would_visit BOOLEAN
  );
  INSERT INTO cities (city, country, visited, would_visit) VALUES ('Madrid', 'Spain',false, null);
  INSERT INTO cities (city, country, visited, would_visit) VALUES ('San Sebastian', 'Spain', true, true);
  INSERT INTO cities (city, country, visited, would_visit) VALUES ('Zagreb', 'Croatia', true, false);
  INSERT INTO cities (city, country, visited, would_visit) VALUES ('Split', 'Croatia', true, true);
  INSERT INTO cities (city, country, would_visit) VALUES ('Riyadh', 'Saudi Arabia', false);
  INSERT INTO cities (city, country, would_visit) VALUES ('Pyongyang', 'North Korea', false);
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