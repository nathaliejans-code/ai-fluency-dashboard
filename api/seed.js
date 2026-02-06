// Run once: node api/seed.js
// Creates tables and inserts default data into Neon PostgreSQL

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') });
const { neon } = require('@neondatabase/serverless');
const { FUNCTIONS, IMPLEMENTATIONS } = require('./defaults');

const sql = neon(process.env.DATABASE_URL);

async function seed() {
  console.log('Creating tables...');

  await sql`
    CREATE TABLE IF NOT EXISTS functions (
      key              VARCHAR(50) PRIMARY KEY,
      name             VARCHAR(100) NOT NULL,
      full_time        INTEGER NOT NULL DEFAULT 0,
      part_time        INTEGER NOT NULL DEFAULT 0,
      part_time_hours  INTEGER NOT NULL DEFAULT 0,
      total_hours      INTEGER NOT NULL DEFAULT 0,
      metric_primary       TEXT NOT NULL DEFAULT '',
      metric_primary_level TEXT NOT NULL DEFAULT ''
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS implementations (
      id             VARCHAR(50) PRIMARY KEY,
      function_key   VARCHAR(50) NOT NULL REFERENCES functions(key) ON DELETE CASCADE,
      name           TEXT NOT NULL,
      complexity     REAL NOT NULL DEFAULT 0,
      roi            REAL NOT NULL DEFAULT 0,
      owner          TEXT NOT NULL DEFAULT '',
      description    TEXT NOT NULL DEFAULT '',
      impact         TEXT NOT NULL DEFAULT '',
      time_saved     REAL NOT NULL DEFAULT 0,
      unit           VARCHAR(30) NOT NULL DEFAULT '',
      frequency      REAL NOT NULL DEFAULT 0,
      created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`CREATE INDEX IF NOT EXISTS idx_impl_function_key ON implementations(function_key)`;

  console.log('Tables created.');

  // Insert functions
  console.log('Inserting functions...');
  for (const f of FUNCTIONS) {
    await sql`
      INSERT INTO functions (key, name, full_time, part_time, part_time_hours, total_hours)
      VALUES (${f.key}, ${f.name}, ${f.fullTime}, ${f.partTime}, ${f.partTimeHours}, ${f.totalHours})
      ON CONFLICT (key) DO UPDATE SET
        name = EXCLUDED.name,
        full_time = EXCLUDED.full_time,
        part_time = EXCLUDED.part_time,
        part_time_hours = EXCLUDED.part_time_hours,
        total_hours = EXCLUDED.total_hours
    `;
  }
  console.log(`  ${FUNCTIONS.length} functions inserted.`);

  // Insert implementations
  console.log('Inserting implementations...');
  for (const i of IMPLEMENTATIONS) {
    await sql`
      INSERT INTO implementations (id, function_key, name, complexity, roi, owner, description, impact, time_saved, unit, frequency)
      VALUES (${i.id}, ${i.functionKey}, ${i.name}, ${i.complexity}, ${i.roi}, ${i.owner}, ${i.description}, ${i.impact}, ${i.timeSaved}, ${i.unit}, ${i.frequency})
      ON CONFLICT (id) DO NOTHING
    `;
  }
  console.log(`  ${IMPLEMENTATIONS.length} implementations inserted.`);

  console.log('\nSeed complete!');
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
