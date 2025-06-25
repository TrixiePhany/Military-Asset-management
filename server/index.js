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

// RBAC Middleware // done
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

// Authentication Route // done
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

// Purchases (Logistics Officer and Admin) // done
app.post('/api/purchases', checkRole(['admin', 'logistics_officer']), auditLog, async (req, res) => {
  const { base_id, asset_id, date } = req.body;
  try {
    await pool.query(
      'INSERT INTO purchases (base_id, asset_id, purchase_date) VALUES ($1, $2, $3)',
      [base_id, asset_id, date]
    );
    res.status(201).json({ message: 'Purchase recorded' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch Purchases (Logistics Officer and Admin) done
app.get('/api/purchases', checkRole(['admin', 'logistics_officer']), auditLog, async (req, res) => {
  try {
    let query = `SELECT 
                      p.purchase_date,
                      a.name as asset,
                      a.type,
                      b.name as base
                  FROM 
                      purchases p
                  JOIN 
                      assets a ON p.asset_id = a.id
                  JOIN 
                      bases b ON p.base_id = b.id
                  ORDER BY 
                      p.purchase_date DESC`;
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching purchases:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


app.get('/api/purchases/filters', checkRole(['admin', 'logistics_officer']), auditLog, async (req, res) => {
  try {
    const { baseId, startDate, endDate, equipmentType } = req.query;
    let conditions = [];
    let values = [];
    let i =1 ;

    if (baseId) {
      conditions.push(`p.base_id = $${i++}`);
      values.push(baseId);
    }

    if (startDate) {
      conditions.push(`p.purchase_date >= $${i++}`);
      values.push(startDate);
    }

    if (endDate) {
      conditions.push(`p.purchase_date <= $${i++}`);
      values.push(endDate);
    }

    if (equipmentType) {
      conditions.push(`a.type ILIKE $${i++}`);
      values.push(equipmentType);
    }
    let query = `SELECT 
                    p.purchase_date,
                    a.name AS asset,
                    a.type,
                    b.name AS base
                FROM purchases p
                JOIN assets a ON p.asset_id = a.id
                JOIN bases b ON p.base_id = b.id`;

    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY p.purchase_date DESC';

    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching filtered purchases:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



// Transfers (Logistics Officer and Admin) done
app.post('/api/transfers', checkRole(['admin', 'logistics_officer']), auditLog, async (req, res) => {
  const { from_baseid, to_baseid, asset_id, date } = req.body;
  try {
    await pool.query(
      'INSERT INTO transfers (from_baseid, to_baseid, asset_id, transfer_date) VALUES ($1, $2, $3, $4)',
      [from_baseid, to_baseid, asset_id, date]
    );
    res.status(201).json({ message: 'Transfer recorded' });
  } catch (error) {
    console.error('Error creating transfer:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetching and gettting Transfer History (admi + logistics) done
app.get('/api/transfers', checkRole(['admin', 'logistics_officer']), auditLog, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        t.transfer_date,
        a.name AS asset,
        b1.name AS from_base,
        b2.name AS to_base
      FROM transfers t
      JOIN assets a ON t.asset_id = a.id
      JOIN bases b1 ON t.from_baseid = b1.id
      JOIN bases b2 ON t.to_baseid = b2.id
      ORDER BY t.transfer_date DESC
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching transfers:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Assignments (Base Commander and Admin) 
app.get('/api/assignments', checkRole(['admin', 'base_commander']), auditLog, async (req, res) => {
  try {
    const query = `SELECT a1.assignment_date as date, p.name AS personnel, a2.name AS asset
                   FROM assignments a1
                   JOIN personnel p ON a1.personnel_id = p.id
                   JOIN assets a2 ON a1.asset_id = a2.id
                   ORDER BY a1.assignment_date DESC`;

    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/assignments/filters', checkRole(['admin', 'base_commander']), async (req, res) => {
  const { asset_id, personnel_id, date } = req.query;
  
  try {
    let conditions = [];
    let values = [];
    let i = 1;

    if (asset_id) {
      conditions.push(`a1.asset_id = $${i++}`);
      values.push(asset_id);
    }

    if (personnel_id) {
      conditions.push(`a1.personnel_id = $${i++}`);
      values.push(personnel_id);
    }

    if (date) {
      conditions.push(`a1.assignment_date = $${i++}`);
      values.push(date);
    }

    let query = `SELECT a1.assignment_date as date, p.name AS personnel, a2.name AS asset
                 FROM assignments a1
                 JOIN personnel p ON a1.personnel_id = p.id
                 JOIN assets a2 ON a1.asset_id = a2.id`;
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY a1.assignment_date DESC';
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/expenditures', checkRole(['admin', 'base_commander']), async (req, res) => {
  try {
    const query = `SELECT e.expenditure_date as date, a.name AS asset, e.quantity
                   FROM expenditures e
                   JOIN assets a ON e.asset_id = a.id
                   ORDER BY e.expenditure_date DESC`;

    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching expenditures:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/expenditures/filters', checkRole(['admin', 'base_commander']), async (req, res) => {
  const { asset_id, quantity, date } = req.query;

  try {
    let conditions = [];
    let values = [];
    let i = 1;

    if (asset_id && asset_id !== '' && !isNaN(asset_id)) {
      conditions.push(`e.asset_id = $${i++}`);
      values.push(asset_id);
    }

    if (quantity && quantity !== '' && !isNaN(quantity)) {
      conditions.push(`e.quantity = $${i++}`);
      values.push(quantity);
    }

    if (date && date !== '' && !isNaN(Date.parse(date))) {
      conditions.push(`e.expenditure_date = $${i++}`);
      values.push(date);
    }

    let query = `SELECT e.expenditure_date as date, a.name AS asset, e.quantity
                 FROM expenditures e
                 JOIN assets a ON e.asset_id = a.id`;
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY e.expenditure_date DESC';
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);

  } catch (error) {
    console.error('Error fetching expenditures:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});