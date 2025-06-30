const { Pool } = require('pg');

const pool = new Pool({
  user: 'eduardolaosplasier', // ← pon aquí tu usuario real (según `whoami`)
  host: 'localhost',
  database: 'asistmed',
  password: '',
  port: 5432,
});

module.exports = pool;

