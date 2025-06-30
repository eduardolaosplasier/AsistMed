const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // <- prueba sin restricción
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use(express.json());

app.post('/citas', (req, res) => {
  console.log('✅ Recibido POST /citas:', req.body);
  res.status(200).json({ mensaje: 'Cita recibida correctamente' });
});

app.listen(5050, () => {
  console.log('✅ Servidor backend CORS test en http://localhost:5050');
});

