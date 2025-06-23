CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    personnel_id INTEGER REFERENCES personnel(id),
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL
);

CREATE TABLE personnel (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    rank VARCHAR(50),
    base_id INTEGER REFERENCES bases(id)
);


CREATE TABLE bases (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE assets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL, -- e.g., vehicle, equipment, supply
    price NUMERIC(12, 2) NOT NULL
);

REATE TABLE purchases (
    id SERIAL PRIMARY KEY,
    base_id INTEGER REFERENCES bases(id) ,
    asset_id INTEGER REFERENCES assets(id),
    purchase_date DATE
);

CREATE TABLE transfers (
    id SERIAL PRIMARY KEY,
    from_baseid INTEGER REFERENCES bases(id),
    to_baseid INTEGER REFERENCES bases(id),
    asset_id INTEGER REFERENCES assets(id),
    transfer_date DATE
);

CREATE TABLE assignments (
    id SERIAL PRIMARY KEY,
    asset_id INTEGER REFERENCES assets(id),
    personnel_id INTEGER REFERENCES personnel(id),
    assignment_date DATE
);

CREATE TABLE expenditures (
  id SERIAL PRIMARY KEY,
  base_id INTEGER REFERENCES bases(id),
  asset_id INTEGER REFERENCES assets(id),
  quantity INTEGER NOT NULL,
  expenditure_date DATE NOT NULL
);

CREATE TABLE audit_log (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  action VARCHAR(255) NOT NULL,
  details JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);