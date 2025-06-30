import { useState } from 'react';

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    paciente: '',
    fecha: '',
    hora: '',
    tipo: 'Consulta',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const cita = {
    paciente_nombre: formData.paciente,
    fecha: `${formData.fecha}T${formData.hora}`,
    medico: 'Dr. Eduardo Laos',
    tipo: formData.tipo,
  };

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/citas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cita)
    });

    if (response.ok) {
      alert('Cita registrada con éxito');
      setFormData({ paciente: '', fecha: '', hora: '', tipo: 'Consulta' });
    } else {
      alert('Error al registrar la cita');
    }
  } catch (error) {
    console.error(error);
    alert('Error de conexión con el servidor');
  }
};

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
      <h2>Agendar Cita</h2>
      <input name="paciente" type="text" placeholder="Nombre del paciente" value={formData.paciente} onChange={handleChange} required />
      <input name="fecha" type="date" value={formData.fecha} onChange={handleChange} required />
      <input name="hora" type="time" value={formData.hora} onChange={handleChange} required />
      <select name="tipo" value={formData.tipo} onChange={handleChange}>
        <option>Consulta</option>
        <option>Control post-operatorio</option>
        <option>Cirugía programada</option>
      </select>
      <button type="submit">Guardar Cita</button>
    </form>
  );
}
