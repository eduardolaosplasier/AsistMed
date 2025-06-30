const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5174');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use(express.json());

app.post('/citas', (req, res) => {
  console.log('🔍 POST /citas recibida:', req.body);
  res.status(201).json({ mensaje: 'Cita recibida (test)', cita: req.body });
});

app.listen(5050, () => {
  console.log('🚀 Servidor test corriendo en http://localhost:5050');
});
