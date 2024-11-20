import { useState, useEffect } from 'react';
import axios from 'axios';

const BuscarUsuario = () => {
  const [usuarioId, setUsuarioId] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState('');
  useEffect(() => {
		const fetchUsuarios = async () => {
			try {
				const response = await axios.get('http://localhost:8080/usuarios/obtenerUsuarios');
				setUsuarios(response.data);
			} catch (error) {
				console.error('Error al cargar los usuarios:');
				setMensaje('Error al cargar la lista de usuarios.');
			}
		};
		fetchUsuarios();
	}, []);
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
      <h2>&nbsp;&nbsp;Buscar Usuario por ID</h2>
      {/* <input type="number" placeholder="Ingrese ID del usuario" value={usuarioId} onChange={(e) => setUsuarioId(e.target.value)} min={1} />&nbsp;&nbsp;&nbsp; */}
      &nbsp;&nbsp;<select value={usuarioId} onChange={(e) => setUsuarioId(e.target.value)} required >
				<option value="">Seleccione un usuario</option>
			  	{usuarios.map((usuario) => (
				<option key={usuario.id_usuario} value={usuario.id_usuario}>
				  {usuario.id_usuario} - {usuario.nombre}
				</option>
				))}
			</select>
      &nbsp;&nbsp;&nbsp;&nbsp;<button className="btn-donate" onClick={handleSearch}>Buscar</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {usuario && (
        <div className='contenedorPadre'>
          <br/>
          <div className='card'>
              <div className="card__title">
                <h2>Detalles del Usuario</h2>
              </div>
                <div className="card__data">
                  <div className="card__right3">
                    <div className="item">
                      <strong>ID Usuario:</strong> {usuario.id_usuario}
                    </div>
                    <div className="item">
                      <strong>Nombre:</strong> {usuario.nombre}
                    </div>
                    <div className="item">
                      <strong>Correo:</strong> {usuario.correo}
                    </div>
                    <div className="item">
                      <strong>DNI: </strong> {usuario.dni}
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