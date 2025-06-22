INSERT INTO bases (name) VALUES ('Base Alpha'), ('Base Bravo');
INSERT INTO users (username, password, role, base_id) VALUES ('admin', 'admin123', 'admin', NULL);
INSERT INTO assets (name, type, base_id, quantity) VALUES ('Humvee', 'vehicle', 1, 10);