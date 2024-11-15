import { useEffect, useState } from 'react';
import axios from 'axios';
const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:8080/usuarios/obtenerUsuarios');
        setUsuarios(response.data);
      } catch (error) {
        setMensaje('Error al cargar los usuarios');
        console.error(error);
      }
    };
    fetchUsuarios();
  }, []);
  const handleDelete = async (id_usuario) => {
    try {
      await axios.delete(`http://localhost:8080/usuarios/eliminarUsuario/${id_usuario}`);
      setUsuarios(usuarios.filter((usuario) => usuario.id_usuario !== id_usuario));
      setMensaje('Usuario eliminado exitosamente.');
    } catch (error) {
      setMensaje('Error al eliminar el usuario.');
      console.error(error);
    }
  };
  
  const handleEdit = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setModalVisible(true);
  };
  // Cerrar el modal
  const closeModal = () => {
    setUsuarioSeleccionado(null);
    setModalVisible(false);
  };
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/usuarios/actualizarUsuario/${usuarioSeleccionado.id_usuario}`, usuarioSeleccionado);
      setMensaje('Póliza actualizada exitosamente.');
      setUsuarios(usuarios.map((usuario) => usuario.id_usuario === usuarioSeleccionado.id_usuario ? usuarioSeleccionado : usuario ) );
      closeModal();
    } catch (error) {
      setMensaje('Error al actualizar el usuario.');
      console.error(error);
    }
  };
  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuarioSeleccionado({ ...usuarioSeleccionado, [name]: value });
  };
  return (
    <div>
      <h1>Listado de Pólizas</h1>
      {mensaje && <p>{mensaje}</p>}
      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Usuario</th>
            <th>Correo Usuario</th>
            <th>DNI Usuario</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id_usuario}>
              <td>{usuario.id_usuario}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.dni}</td>
              <td>
                <button onClick={() => handleEdit(usuario)}>Editar</button>
                <button onClick={() => handleDelete(usuario.id_usuario)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal para editar póliza */}
      {modalVisible && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h2>Editar Usuario</h2>
            <form onSubmit={handleUpdate}>
            <div>
              <label>Nombre:</label>
              <input type="text" name="nombre" value={usuarioSeleccionado.nombre} onChange={handleChange} required />
            </div>
            <div>
              <label>Correo:</label>
              <input type="text" name="correo" value={usuarioSeleccionado.correo} onChange={handleChange} required />
            </div>
            <div>
              <label>DNI:</label>
              <input type="text" name="dni" value={usuarioSeleccionado.dni} onChange={handleChange} required />
            </div>
            <div>
              <button type="submit">Guardar Cambios</button>
              <button type="button" onClick={closeModal}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
  );};
// Estilos simples para el modal
const modalStyle = { 
  position: 'fixed', top: 0, left: 0,
  width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  display: 'flex', alignItems: 'center', justifyContent: 'center', 
  zIndex: 1000,
};
const modalContentStyle = {
  backgroundColor: 'white', padding: '20px', borderRadius: '5px', width: '400px',};
export default ListarUsuarios;