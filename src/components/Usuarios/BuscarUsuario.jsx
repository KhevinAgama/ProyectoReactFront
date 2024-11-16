import { useState } from 'react';
import axios from 'axios';

const BuscarUsuario = () => {
  const [usuarioId, setUsuarioId] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState('');
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/usuarios/obtenerUsuarios/${usuarioId}`);
      setUsuario(response.data);
      setError('');
    } catch (err) {
      setError('No se encontró el usuario con el ID proporcionado.');
      setUsuario(null);
    }
  };
  return (
    <div>
      <h2>Buscar Póliza por ID</h2>
      <input type="number" placeholder="Ingrese ID de la póliza" value={usuarioId} onChange={(e) => setUsuarioId(e.target.value)} min={1} />
      <button onClick={handleSearch}>Buscar</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {usuario && (
        <div>
          <h3>Detalles de la Póliza</h3>
          <p><strong>ID: </strong> {usuario.id_usuario}</p>
          <p><strong>Nombre Usuario: </strong> {usuario.nombre}</p>
          <p><strong>Correo Usuario: </strong> {usuario.correo}</p>
          <p><strong>DNI Usuario: </strong> {usuario.dni}</p>
          </div>
      )}
    </div>
  );
};
export default BuscarUsuario;