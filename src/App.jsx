import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ListaPoliza from './components/Polizas/ListaPoliza';
import CrearPoliza from './components/Polizas/CrearPoliza';
import BuscarPoliza from './components/Polizas/BuscarPoliza';
import ListaUsuarios from './components/Usuarios/ListaUsuarios';
import CrearUsuario from './components/Usuarios/CrearUsuario';
import BuscarUsuario from './components/Usuarios/BuscarUsuario';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Sincronizar el estado de autenticación con localStorage
  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(auth === 'true'); 
    // Convertir el valor de string a booleano
  }, []);
  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={handleLogin} />} />
        <Route path="/dashboard/*" element={ isAuthenticated ? ( <Dashboard onLogout={handleLogout} /> ) : ( <Navigate to="/login" />) } >
          <Route path="polizas/lista" element={<ListaPoliza />} />
          <Route path="polizas/crear" element={<CrearPoliza />} />
          <Route path="polizas/buscar" element={<BuscarPoliza />} />
          <Route path="usuarios/lista" element={<ListaUsuarios />} />
          <Route path="usuarios/crear" element={<CrearUsuario />} />
          <Route path="usuarios/buscar" element={<BuscarUsuario />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router> 
  );
};
export default App;