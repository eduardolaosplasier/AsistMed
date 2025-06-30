const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // O usa 'http://localhost:5174'
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('AsistMed backend running');
});

app.put('/citas/:id/estado', async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    await db.query('UPDATE citas SET estado = $1 WHERE id = $2', [estado, id]);
    res.status(200).json({ mensaje: 'Estado actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar estado:', error.stack);
    res.status(500).json({ mensaje: 'Error al actualizar estado' });
  }
});

app.get('/citas', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM citas ORDER BY fecha ASC');
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener citas:', error.stack);
    return res.status(500).json({ mensaje: 'Error al obtener las citas' });
  }
});

app.post('/citas', async (req, res) => {
  const { paciente_nombre, fecha, medico, tipo } = req.body;

  if (!paciente_nombre || !fecha || !medico || !tipo) {
    return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
  }

  try {
    await db.query(
      'INSERT INTO citas (paciente_nombre, fecha, medico, tipo) VALUES ($1, $2, $3, $4)',
      [paciente_nombre, fecha, medico, tipo]
    );

    return res.status(200).json({ mensaje: 'Cita registrada con éxito' });
  } catch (error) {
    console.error('Error al registrar cita:', error.stack);
    return res.status(500).json({ mensaje: 'Error al registrar cita' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

