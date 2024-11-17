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
      <h2>Buscar Usuario por ID</h2>
      <input type="number" placeholder="Ingrese ID del usuario" value={usuarioId} onChange={(e) => setUsuarioId(e.target.value)} min={1} />&nbsp;&nbsp;&nbsp;
      <button className="btn-donate" onClick={handleSearch}>Buscar</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {usuario && (
        <div>
          <br/>
          <div className='card'>
              <div className="card__title">
                <h2>Detalles del Usuario</h2>
              </div>
                <div className="card__data">
                  <div className="card__right3">
                    <div className="item">
                      <strong>Tipo de Seguro:</strong> {usuario.id_usuario}
                    </div>
                    <div className="item">
                      <strong>Fecha de Inicio:</strong> {usuario.nombre}
                    </div>
                    <div className="item">
                      <strong>Fecha de Vencimiento:</strong> {usuario.correo}
                    </div>
                    <div className="item">
                      <strong>Monto Asegurado:</strong> {usuario.dni}
                    </div>
                  </div>
                </div>
                <br/>              
            </div>  
        </div>
      )}
    </div>
  );
};
export default BuscarUsuario;