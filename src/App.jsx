import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ListaPoliza from './components/Polizas/ListaPoliza';
import CrearPoliza from './components/Polizas/CrearPoliza';
import BuscarPoliza from './components/Polizas/BuscarPoliza';
import ListaUsuarios from './components/Usuarios/ListaUsuarios';
import CrearUsuario from './components/Usuarios/CrearUsuario';
import BuscarUsuario from './components/Usuarios/BuscarUsuario';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true' // Recuperar el estado del almacenamiento local
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Guardar el estado en Local Storage
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Eliminar el estado del almacenamiento local
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={!isAuthenticated ? <Login setIsAuthenticated={handleLogin} /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />}
        >
          <Route path="polizas/lista" element={<ListaPoliza />} />
          <Route path="polizas/crear" element={<CrearPoliza />} />
          <Route path="polizas/buscar" element={<BuscarPoliza />} />
          <Route path="usuarios/lista" element={<ListaUsuarios />} />
          <Route path="usuarios/crear" element={<CrearUsuario />} />
          <Route path="usuarios/buscar" element={<BuscarUsuario />} />
        </Route>
        <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;