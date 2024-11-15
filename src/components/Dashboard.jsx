import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Bienvenido al Dashboard</h1>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Dashboard;