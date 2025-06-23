INSERT INTO bases (name) VALUES ('Base Alpha'), ('Base Bravo'), ('Base Charlie');

INSERT INTO users (personnel_id, username, password, role) VALUES
(1, 'admin', 'admin1', 'admin'),
(2, 'baseCom', 'base1', 'base_commander'),
(3, 'officer', 'officer1', 'logistics_officer');

INSERT INTO personnel (id, name, rank, base_id) VALUES
(1, 'John Carter', 'Sergeant', 1),
(2, 'Sarah Whitman', 'Lieutenant', 2),
(3, 'David Brooks', 'Captain', 3),
(4, 'Emily Chan', 'Major', 1),
(5, 'James O’Neill', 'Colonel', 2),
(6, 'Anna Schmidt', 'Sergeant', 3),
(7, 'Kyle Thompson', 'Lieutenant', 1),
(8, 'Priya Desai', 'Captain', 2),
(9, 'Miguel Alvarez', 'Major', 3),
(10, 'Rebecca Liu', 'Colonel', 1);

INSERT INTO assets (id, name, type, price) VALUES
(1, 'M16 Rifle', 'Weapons', 1200.00),
(2, 'AK-47', 'Weapons', 800.00),
(3, 'Glock 19', 'Weapons', 600.00),
(4, 'M4 Carbine', 'Weapons', 1300.00),
(5, 'Barrett M82', 'Weapons', 9000.00),
(6, '5.56mm NATO Rounds', 'Ammunition', 0.50),
(7, '7.62mm Rounds', 'Ammunition', 0.60),
(8, '9mm Parabellum', 'Ammunition', 0.40),
(9, '.50 BMG Rounds', 'Ammunition', 2.50),
(10, 'M67 Grenade', 'Ammunition', 45.00),
(11, 'Humvee', 'Vehicle', 70000.00),
(12, 'M1 Abrams Tank', 'Vehicle', 8500000.00),
(13, 'Black Hawk Helicopter', 'Vehicle', 21000000.00),
(14, 'MRAP Cougar', 'Vehicle', 600000.00),
(15, 'LAV-25', 'Vehicle', 3000000.00),
(16, 'RPG-7', 'Weapons', 500.00),
(17, 'M203 Grenade Launcher', 'Weapons', 3500.00),
(18, 'M320 Grenade Launcher', 'Weapons', 3600.00),
(19, '40mm Grenade', 'Ammunition', 80.00),
(20, 'TOW Missile', 'Ammunition', 18000.00);

INSERT INTO purchases (id, base_id, asset_id, purchase_date) VALUES
(1, 1, 1, '2010-06-12'),
(2, 1, 2, '2011-03-15'),
(3, 1, 3, '2012-07-22'),
(4, 2, 4, '2015-09-10'),
(5, 2, 5, '2016-12-01'),
(6, 2, 6, '2013-08-18'),
(7, 3, 7, '2014-02-25'),
(8, 3, 8, '2015-11-05'),
(9, 3, 9, '2017-01-14'),
(10, 1, 10, '2018-03-23'),
(11, 1, 11, '2019-06-30'),
(12, 2, 12, '2020-08-14'),
(13, 2, 13, '2021-05-09'),
(14, 2, 14, '2021-12-25'),
(15, 3, 15, '2022-04-17'),
(16, 3, 16, '2023-02-07'),
(17, 1, 17, '2023-05-03'),
(18, 1, 18, '2023-11-21'),
(19, 1, 19, '2024-01-01'),
(20, 1, 20, '2024-04-15');

INSERT INTO assignments (id, asset_id, personnel_id, assignment_date) VALUES
(1, 4, 4, '2016-03-01'),
(2, 6, 7, '2014-05-01'),
(3, 7, 10, '2015-01-01'),
(4, 9, 4, '2018-01-01'),
(5, 13, 10, '2023-01-01'),
(6, 8, 5, '2017-01-01'),
(7, 10, 8, '2020-01-01'),
(8, 11, 6, '2021-01-01');

INSERT INTO transfers (id, from_baseid, to_baseid, asset_id, transfer_date) VALUES
(1, 1, 2, 1, '2011-01-01'),
(2, 1, 3, 2, '2011-10-10'),
(3, 1, 3, 3, '2012-08-08'),
(4, 2, 1, 4, '2016-02-02'),
(5, 2, 3, 5, '2017-03-03'),
(6, 2, 1, 6, '2014-04-04'),
(7, 3, 1, 7, '2014-06-06'),
(8, 3, 2, 8, '2016-06-06'),
(9, 3, 1, 9, '2017-07-07'),
(10, 1, 2, 10, '2019-01-01'),
(11, 1, 3, 11, '2020-01-01'),
(12, 2, 3, 12, '2021-09-09'),
(13, 2, 1, 13, '2022-08-08'),
(14, 2, 3, 14, '2023-07-07'),
(15, 3, 2, 15, '2024-06-06');
