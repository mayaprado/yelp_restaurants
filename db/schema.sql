\c yelp_db

DROP TABLE IF EXISTS yelp_reviews;

CREATE TABLE yelp_reviews (
   id SERIAL PRIMARY KEY,
   rest_id VARCHAR(100) NOT NULL,
   rev_text VARCHAR(4000) NOT NULL
) 
