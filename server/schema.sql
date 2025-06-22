CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL, -- admin, base_commander, logistics_officer
  base_id INTEGER
);

CREATE TABLE bases (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE assets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL, -- e.g., vehicle, weapon
  base_id INTEGER REFERENCES bases(id),
  quantity INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE purchases (
  id SERIAL PRIMARY KEY,
  base_id INTEGER REFERENCES bases(id),
  asset_id INTEGER REFERENCES assets(id),
  quantity INTEGER NOT NULL,
  purchase_date DATE NOT NULL
);

CREATE TABLE transfers (
  id SERIAL PRIMARY KEY,
  from_base_id INTEGER REFERENCES bases(id),
  to_base_id INTEGER REFERENCES bases(id),
  asset_id INTEGER REFERENCES assets(id),
  quantity INTEGER NOT NULL,
  transfer_date DATE NOT NULL
);

CREATE TABLE assignments (
  id SERIAL PRIMARY KEY,
  base_id INTEGER REFERENCES bases(id),
  asset_id INTEGER REFERENCES assets(id),
  personnel_id INTEGER, -- Could reference a personnel table
  quantity INTEGER NOT NULL,
  assignment_date DATE NOT NULL
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