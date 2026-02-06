const express = require('express');
const cors = require('cors');
const { getDb } = require('./db');
const { FUNCTIONS, IMPLEMENTATIONS } = require('./defaults');

const app = express();
app.use(cors());
app.use(express.json());

// ========================
// HELPER: Reconstruct the nested JSON shape the frontend expects
// ========================
async function getAllFunctionData() {
  const sql = getDb();
  const functions = await sql`SELECT * FROM functions ORDER BY key`;
  const implementations = await sql`SELECT * FROM implementations ORDER BY created_at`;

  const result = {};
  for (const f of functions) {
    result[f.key] = {
      name: f.name,
      teamConfig: {
        fullTime: f.full_time,
        partTime: f.part_time,
        partTimeHours: f.part_time_hours,
        totalHours: f.total_hours,
      },
      implementations: [],
      metrics: {
        primary: f.metric_primary,
        primaryLevel: f.metric_primary_level,
      },
    };
  }

  for (const impl of implementations) {
    if (result[impl.function_key]) {
      result[impl.function_key].implementations.push({
        id: impl.id,
        name: impl.name,
        complexity: impl.complexity,
        roi: impl.roi,
        owner: impl.owner,
        description: impl.description,
        impact: impl.impact,
        timeSaved: impl.time_saved,
        unit: impl.unit,
        frequency: impl.frequency,
      });
    }
  }

  return result;
}

// ========================
// API ROUTES
// ========================

// GET all function data
app.get('/api/functions', async (req, res) => {
  try {
    const data = await getAllFunctionData();
    res.json(data);
  } catch (err) {
    console.error('GET /api/functions error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET single function
app.get('/api/functions/:key', async (req, res) => {
  try {
    const data = await getAllFunctionData();
    const fd = data[req.params.key];
    if (!fd) return res.status(404).json({ error: 'Function not found' });
    res.json(fd);
  } catch (err) {
    console.error('GET /api/functions/:key error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// PUT update team config
app.put('/api/functions/:key/team', async (req, res) => {
  try {
    const sql = getDb();
    const key = req.params.key;
    const { fullTime, partTime, partTimeHours, totalHours } = req.body;

    const updates = [];
    const values = [];
    let idx = 1;

    if (fullTime !== undefined) { updates.push(`full_time = $${idx++}`); values.push(fullTime); }
    if (partTime !== undefined) { updates.push(`part_time = $${idx++}`); values.push(partTime); }
    if (partTimeHours !== undefined) { updates.push(`part_time_hours = $${idx++}`); values.push(partTimeHours); }
    if (totalHours !== undefined) { updates.push(`total_hours = $${idx++}`); values.push(totalHours); }

    if (updates.length === 0) return res.status(400).json({ error: 'No fields to update' });

    values.push(key);
    await sql(`UPDATE functions SET ${updates.join(', ')} WHERE key = $${idx}`, values);

    const data = await getAllFunctionData();
    const fd = data[key];
    if (!fd) return res.status(404).json({ error: 'Function not found' });
    res.json(fd);
  } catch (err) {
    console.error('PUT team error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// PUT update metrics
app.put('/api/functions/:key/metrics', async (req, res) => {
  try {
    const sql = getDb();
    const key = req.params.key;
    const { primary, primaryLevel } = req.body;

    const updates = [];
    const values = [];
    let idx = 1;

    if (primary !== undefined) { updates.push(`metric_primary = $${idx++}`); values.push(primary); }
    if (primaryLevel !== undefined) { updates.push(`metric_primary_level = $${idx++}`); values.push(primaryLevel); }

    if (updates.length === 0) return res.status(400).json({ error: 'No fields to update' });

    values.push(key);
    await sql(`UPDATE functions SET ${updates.join(', ')} WHERE key = $${idx}`, values);

    const data = await getAllFunctionData();
    const fd = data[key];
    if (!fd) return res.status(404).json({ error: 'Function not found' });
    res.json(fd);
  } catch (err) {
    console.error('PUT metrics error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST add implementation
app.post('/api/functions/:key/implementations', async (req, res) => {
  try {
    const sql = getDb();
    const key = req.params.key;

    // Verify function exists
    const funcs = await sql`SELECT key FROM functions WHERE key = ${key}`;
    if (funcs.length === 0) return res.status(404).json({ error: 'Function not found' });

    const id = Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
    const { name, complexity, roi, owner, description, impact, timeSaved, unit, frequency } = req.body;

    await sql`
      INSERT INTO implementations (id, function_key, name, complexity, roi, owner, description, impact, time_saved, unit, frequency)
      VALUES (${id}, ${key}, ${name || ''}, ${complexity || 0}, ${roi || 0}, ${owner || ''}, ${description || ''}, ${impact || ''}, ${timeSaved || 0}, ${unit || ''}, ${frequency || 0})
    `;

    res.status(201).json({
      id, name: name || '', complexity: complexity || 0, roi: roi || 0,
      owner: owner || '', description: description || '', impact: impact || '',
      timeSaved: timeSaved || 0, unit: unit || '', frequency: frequency || 0,
    });
  } catch (err) {
    console.error('POST implementation error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// PUT update implementation
app.put('/api/functions/:key/implementations/:implId', async (req, res) => {
  try {
    const sql = getDb();
    const { key, implId } = req.params;

    const fieldMap = {
      name: 'name', complexity: 'complexity', roi: 'roi', owner: 'owner',
      description: 'description', impact: 'impact', timeSaved: 'time_saved',
      unit: 'unit', frequency: 'frequency',
    };

    const updates = [];
    const values = [];
    let idx = 1;

    for (const [jsField, dbField] of Object.entries(fieldMap)) {
      if (req.body[jsField] !== undefined) {
        updates.push(`${dbField} = $${idx++}`);
        values.push(req.body[jsField]);
      }
    }

    if (updates.length === 0) return res.status(400).json({ error: 'No fields to update' });

    values.push(implId, key);
    await sql(`UPDATE implementations SET ${updates.join(', ')} WHERE id = $${idx++} AND function_key = $${idx}`, values);

    const rows = await sql`SELECT * FROM implementations WHERE id = ${implId} AND function_key = ${key}`;
    if (rows.length === 0) return res.status(404).json({ error: 'Implementation not found' });

    const impl = rows[0];
    res.json({
      id: impl.id, name: impl.name, complexity: impl.complexity, roi: impl.roi,
      owner: impl.owner, description: impl.description, impact: impl.impact,
      timeSaved: impl.time_saved, unit: impl.unit, frequency: impl.frequency,
    });
  } catch (err) {
    console.error('PUT implementation error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// DELETE implementation
app.delete('/api/functions/:key/implementations/:implId', async (req, res) => {
  try {
    const sql = getDb();
    await sql`DELETE FROM implementations WHERE id = ${req.params.implId} AND function_key = ${req.params.key}`;
    res.json({ success: true });
  } catch (err) {
    console.error('DELETE error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET export
app.get('/api/export', async (req, res) => {
  try {
    const data = await getAllFunctionData();
    res.setHeader('Content-Disposition', 'attachment; filename=ai-fluency-data.json');
    res.json({ functionData: data });
  } catch (err) {
    console.error('GET /api/export error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST reset to defaults
app.post('/api/reset', async (req, res) => {
  try {
    const sql = getDb();

    // Clear all implementations
    await sql`DELETE FROM implementations`;

    // Reset all functions to zero
    await sql`UPDATE functions SET full_time = 0, part_time = 0, part_time_hours = 0, total_hours = 0, metric_primary = '', metric_primary_level = ''`;

    // Re-apply default team configs
    for (const f of FUNCTIONS) {
      await sql`
        UPDATE functions SET full_time = ${f.fullTime}, part_time = ${f.partTime}, part_time_hours = ${f.partTimeHours}, total_hours = ${f.totalHours}
        WHERE key = ${f.key}
      `;
    }

    // Re-insert default implementations
    for (const i of IMPLEMENTATIONS) {
      await sql`
        INSERT INTO implementations (id, function_key, name, complexity, roi, owner, description, impact, time_saved, unit, frequency)
        VALUES (${i.id}, ${i.functionKey}, ${i.name}, ${i.complexity}, ${i.roi}, ${i.owner}, ${i.description}, ${i.impact}, ${i.timeSaved}, ${i.unit}, ${i.frequency})
        ON CONFLICT (id) DO NOTHING
      `;
    }

    res.json({ success: true });
  } catch (err) {
    console.error('POST /api/reset error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// ========================
// EXPORT FOR VERCEL
// ========================
module.exports = app;
