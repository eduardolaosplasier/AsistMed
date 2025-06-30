import AppointmentForm from './components/AppointmentForm';
import CitaList from './components/CitaList';

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Agenda AsistMed</h1>
      <AppointmentForm />
      <hr />
      <CitaList />
    </div>
  );
}

export default App;

