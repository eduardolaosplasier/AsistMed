import { useEffect, useState } from 'react';

export default function CitaList() {
  const [citas, setCitas] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');

  useEffect(() => {
    fetch('http://localhost:5050/citas')
      .then(res => res.json())
      .then(data => setCitas(data))
      .catch(err => console.error('Error al cargar citas:', err));
  }, []);

  const actualizarEstado = async (id, nuevoEstado) => {
    try {
      const res = await fetch(`http://localhost:5050/citas/${id}/estado`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado })
      });

      if (res.ok) {
        setCitas(citas.map(cita =>
          cita.id === id ? { ...cita, estado: nuevoEstado } : cita
        ));
      }
    } catch (error) {
      console.error('Error al actualizar estado:', error);
    }
  };

  const citasFiltradas = citas.filter(cita => {
    const nombreCoincide = cita.paciente_nombre.toLowerCase().includes(filtroNombre.toLowerCase());
    const fechaCoincide = filtroFecha === '' || cita.fecha.startsWith(filtroFecha);
    return nombreCoincide && fechaCoincide;
  });

  return (
    <div>
      <h2>Citas Agendadas</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Filtrar por paciente"
          value={filtroNombre}
          onChange={e => setFiltroNombre(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <input
          type="date"
          value={filtroFecha}
          onChange={e => setFiltroFecha(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
      </div>

      {citasFiltradas.length === 0 ? (
        <p>No hay citas que coincidan.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: '100%', marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Paciente</th>
              <th>Fecha</th>
              <th>Médico</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citasFiltradas.map(cita => (
              <tr key={cita.id}>
                <td>{cita.id}</td>
                <td>{cita.paciente_nombre}</td>
                <td>{new Date(cita.fecha).toLocaleString()}</td>
                <td>{cita.medico}</td>
                <td>{cita.tipo}</td>
                <td>{cita.estado}</td>
                <td>
                  <button onClick={() => actualizarEstado(cita.id, 'confirmada')}>Confirmar</button>{' '}
                  <button onClick={() => actualizarEstado(cita.id, 'cancelada')}>Cancelar</button>{' '}
                  <button onClick={() => actualizarEstado(cita.id, 'pendiente')}>Pendiente</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
