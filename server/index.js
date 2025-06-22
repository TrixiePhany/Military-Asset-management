const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const SECRET_KEY = '11c3b4985ed58738c3273ae9b89e3777053c8d2d28b5febb591a3e6eb6ec0278';

// Database connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'military_asset_db',
  password: 'root',
  port: 5432,
});

// Middleware
app.use(cors(
  {
    origin: 'http://localhost:5173', 
    credentials: true, 
  }
));
app.use(express.json());

// RBAC Middleware
const checkRole = (roles) => (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (!roles.includes(decoded.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Audit Log Middleware
const auditLog = async (req, res, next) => {
  const { user, method, originalUrl, body } = req;
  try {
    await pool.query(
      'INSERT INTO audit_log (user_id, action, details, created_at) VALUES ($1, $2, $3, $4)',
      [user?.id || null, `${method} ${originalUrl}`, JSON.stringify(body), new Date()]
    );
    next();
  } catch (error) {
    console.error('Audit log error:', error);
    next();
  }
};

// Authentication Route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    if (!user || user.password !== password) { // Use bcrypt in production
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, role: user.role, base_id: user.base_id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Dashboard Metrics (Admin and Base Commander)
app.get('/api/dashboard/:baseId', checkRole(['admin', 'base_commander']), async (req, res) => {
  const { baseId } = req.params;
  try {
    const openingBalance = await pool.query(
      'SELECT SUM(quantity) as total FROM assets WHERE base_id = $1 AND created_at < $2',
      [baseId, new Date()]
    );
    const purchases = await pool.query(
      'SELECT SUM(quantity) as total FROM purchases WHERE base_id = $1 AND created_at < $2',
      [baseId, new Date()]
    );
    const transfersIn = await pool.query(
      'SELECT SUM(quantity) as total FROM transfers WHERE to_base_id = $1 AND created_at < $2',
      [baseId, new Date()]
    );
    const transfersOut = await pool.query(
      'SELECT SUM(quantity) as total FROM transfers WHERE from_base_id = $1 AND created_at < $2',
      [baseId, new Date()]
    );
    const assigned = await pool.query(
      'SELECT SUM(quantity) as total FROM assignments WHERE base_id = $1 AND created_at < $2',
      [baseId, new Date()]
    );
    const expended = await pool.query(
      'SELECT SUM(quantity) as total FROM expenditures WHERE base_id = $1 AND created_at < $2',
      [baseId, new Date()]
    );

    const closingBalance = (
      (openingBalance.rows[0]?.total || 0) +
      (purchases.rows[0]?.total || 0) +
      (transfersIn.rows[0]?.total || 0) -
      (transfersOut.rows[0]?.total || 0)
    );

    res.json({
      openingBalance: openingBalance.rows[0]?.total || 0,
      closingBalance,
      netMovement: (purchases.rows[0]?.total || 0) + (transfersIn.rows[0]?.total || 0) - (transfersOut.rows[0]?.total || 0),
      assigned: assigned.rows[0]?.total || 0,
      expended: expended.rows[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Purchases (Logistics Officer and Admin)
app.post('/api/purchases', checkRole(['admin', 'logistics_officer']), auditLog, async (req, res) => {
  const { base_id, asset_id, quantity, date } = req.body;
  try {
    await pool.query(
      'INSERT INTO purchases (base_id, asset_id, quantity, purchase_date) VALUES ($1, $2, $3, $4)',
      [base_id, asset_id, quantity, date]
    );
    res.status(201).json({ message: 'Purchase recorded' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Transfers (Logistics Officer and Admin)
app.post('/api/transfers', checkRole(['admin', 'logistics_officer']), auditLog, async (req, res) => {
  const { from_base_id, to_base_id, asset_id, quantity, date } = req.body;
  try {
    await pool.query(
      'INSERT INTO transfers (from_base_id, to_base_id, asset_id, quantity, transfer_date) VALUES ($1, $2, $3, $4, $5)',
      [from_base_id, to_base_id, asset_id, quantity, date]
    );
    res.status(201).json({ message: 'Transfer recorded' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Assignments (Base Commander and Admin)
app.post('/api/assignments', checkRole(['admin', 'base_commander']), auditLog, async (req, res) => {
  const { base_id, asset_id, personnel_id, quantity, date } = req.body;
  try {
    await pool.query(
      'INSERT INTO assignments (base_id, asset_id, personnel_id, quantity, assignment_date) VALUES ($1, $2, $3, $4, $5)',
      [base_id, asset_id, personnel_id, quantity, date]
    );
    res.status(201).json({ message: 'Assignment recorded' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Expenditures (Base Commander and Admin)
app.post('/api/expenditures', checkRole(['admin', 'base_commander']), auditLog, async (req, res) => {
  const { base_id, asset_id, quantity, date } = req.body;
  try {
    await pool.query(
      'INSERT INTO expenditures (base_id, asset_id, quantity, expenditure_date) VALUES ($1, $2, $3, $4)',
      [base_id, asset_id, quantity, date]
    );
    res.status(201).json({ message: 'Expenditure recorded' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});