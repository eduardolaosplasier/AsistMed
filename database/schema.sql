-- SQL schema base para citas
CREATE TABLE citas (
    id SERIAL PRIMARY KEY,
    paciente_nombre TEXT,
    fecha TIMESTAMP,
    medico TEXT,
    estado TEXT
);