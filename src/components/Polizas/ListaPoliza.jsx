import { useEffect, useState } from 'react';
import axios from 'axios';
const ListarPoliza = () => {
  const [polizas, setPolizas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [polizaSeleccionada, setPolizaSeleccionada] = useState(null);
  // Obtener las pólizas desde el backend
  useEffect(() => {
    const fetchPolizas = async () => {
      try {
        const response = await axios.get('http://localhost:8080/polizas/listarPoliza');
        setPolizas(response.data);
      } catch (error) {
        setMensaje('Error al cargar las pólizas.');
        console.error(error);
      }
    };
    fetchPolizas();
  }, []);
  // Manejar la eliminación de una póliza
  const handleDelete = async (id_poliza) => {
    try {
      await axios.delete(`http://localhost:8080/polizas/eliminarPoliza/${id_poliza}`);
      setPolizas(polizas.filter((poliza) => poliza.id_poliza !== id_poliza));
      setMensaje('Póliza eliminada exitosamente.');
    } catch (error) {
      setMensaje('Error al eliminar la póliza.');
      console.error(error);
    }
  };
  // Abrir el modal con los datos de la póliza seleccionada
  const handleEdit = (poliza) => {
    setPolizaSeleccionada(poliza);
    setModalVisible(true);
  };
  // Cerrar el modal
  const closeModal = () => {
    setPolizaSeleccionada(null);
    setModalVisible(false);
  };
  // Manejar la actualización de la póliza
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/polizas/actualizarPoliza/${polizaSeleccionada.id_poliza}`, polizaSeleccionada);
      setMensaje('Póliza actualizada exitosamente.');
      setPolizas(polizas.map((poliza) => poliza.id_poliza === polizaSeleccionada.id_poliza ? polizaSeleccionada : poliza ) );
      closeModal();
    } catch (error) {
      setMensaje('Error al actualizar la póliza.');
      console.error(error);
    }
  };
  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPolizaSeleccionada({ ...polizaSeleccionada, [name]: value });
  };
  return (
    <div>
      <h1>Listado de Pólizas</h1>
      {mensaje && <p>{mensaje}</p>}
      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo de Seguro</th>
            <th>Fecha de Inicio</th>
            <th>Fecha de Vencimiento</th>
            <th>Monto Asegurado</th>
            <th>Detalles Adicionales</th>
            <th>ID Usuario</th>
            <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
          {polizas.map((poliza) => (
            <tr key={poliza.id_poliza}>
              <td>{poliza.id_poliza}</td>
              <td>{poliza.tipo_seguro}</td>
              <td>{poliza.fecha_inicio}</td>
              <td>{poliza.fecha_vencimiento}</td>
              <td>{poliza.monto_asegurado}</td>
              <td>{poliza.detalles_adicionales || 'N/A'}</td>
              <td>{poliza.id_usuario}</td>
              <td>
                <button onClick={() => handleEdit(poliza)}>Editar</button>
                <button onClick={() => handleDelete(poliza.id_poliza)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal para editar póliza */}
      {modalVisible && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h2>Editar Póliza</h2>
            <form onSubmit={handleUpdate}>
            <div>
              <label>Tipo de Seguro:</label>
              {/* <input type="text" name="tipo_seguro" value={polizaSeleccionada.tipo_seguro} onChange={handleChange} required /> */}
              <select name="tipo_seguro" value={polizaSeleccionada.tipo_seguro} onChange={handleChange} required>
                <option value="">Seleccione un tipo de seguro</option>
                <option value="auto">auto</option>
                <option value="celular">celular</option>
                <option value="inmueble">inmueble</option>
              </select>
            </div>
            <div>
              <label>Fecha de Inicio:</label>
              <input type="date" name="fecha_inicio" value={polizaSeleccionada.fecha_inicio} onChange={handleChange} required />
            </div>
            <div>
              <label>Fecha de Vencimiento:</label>
              <input type="date" name="fecha_vencimiento" value={polizaSeleccionada.fecha_vencimiento} onChange={handleChange} required />
            </div>
            <div>
              <label>Monto Asegurado:</label>
              <input type="number" name="monto_asegurado" value={polizaSeleccionada.monto_asegurado} onChange={handleChange} min="0" required />
            </div>
            <div>
              <label>Detalles Adicionales:</label>
              <textarea name="detalles_adicionales" value={polizaSeleccionada.detalles_adicionales || ''} onChange={handleChange} />
            </div>
            <div>
              <label>ID Usuario:</label>
              <input type="text" name="id_usuario" value={polizaSeleccionada.id_usuario || ''} onChange={handleChange} min="0" required/>
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
export default ListarPoliza;