-- populate more data into the country & city tables (visited, haven't visited, don't want to visit again)
-- create city table with data constraints
-- move country & ethnic & % of ethnicities in another table
-- write a query that returns all cities that i haven't been to in countries id visit again (ie. madrid)
DROP TABLE IF EXISTS countries;
CREATE TABLE countries (
  name TEXT PRIMARY KEY,
  visited BOOLEAN DEFAULT false,
  would_visit_again BOOLEAN
);
INSERT INTO countries (name, visited, would_visit_again) VALUES ('Spain', true, true); 
INSERT INTO countries (name, visited, would_visit_again VALUES ('Croatia', true, true);

DROP TABLE IF EXISTS cities;
CREATE TABLE cities (
  