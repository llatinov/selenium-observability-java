CREATE TABLE person (
  id         SERIAL PRIMARY KEY,
  first_name VARCHAR(256) NOT NULL,
  last_name  VARCHAR(256) NOT NULL,
  email      VARCHAR(256) NOT NULL
);

INSERT INTO person (first_name, last_name, email)
VALUES
  ('John', 'Doe', 'john.doe@automationrhapsody.com'),
  ('Jane', 'Doe', 'jane.doe@automationrhapsody.com');