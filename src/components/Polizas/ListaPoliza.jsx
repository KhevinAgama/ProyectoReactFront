import { useEffect, useState } from "react";
import axios from "axios";
import "../estilos/botones.css";

const ListarPoliza = () => {
  const [polizas, setPolizas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [polizaSeleccionada, setPolizaSeleccionada] = useState(null);
  // Obtener las pólizas desde el backend
  useEffect(() => {
    const fetchPolizas = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/polizas/listarPoliza"
        );
        setPolizas(response.data);
      } catch (error) {
        setMensaje("Error al cargar las pólizas.");
        console.error(error);
      }
    };
    fetchPolizas();
  }, []);
  // Manejar la eliminación de una póliza
  const handleDelete = async (id_poliza) => {
    try {
      await axios.delete(
        `http://localhost:8080/polizas/eliminarPoliza/${id_poliza}`
      );
      setPolizas(polizas.filter((poliza) => poliza.id_poliza !== id_poliza));
      setMensaje("Póliza eliminada exitosamente.");
    } catch (error) {
      setMensaje("Error al eliminar la póliza.");
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
      await axios.put(
        `http://localhost:8080/polizas/actualizarPoliza/${polizaSeleccionada.id_poliza}`,
        polizaSeleccionada
      );
      setMensaje("Póliza actualizada exitosamente.");
      setPolizas(
        polizas.map((poliza) =>
          poliza.id_poliza === polizaSeleccionada.id_poliza
            ? polizaSeleccionada
            : poliza
        )
      );
      closeModal();
    } catch (error) {
      setMensaje("Error al actualizar la póliza.");
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
      <h2>Listado de Pólizas</h2>
      {mensaje && <p>{mensaje}</p>}
      <table className="blueTable">
        <thead>
          <tr>
            <th>ID</th>
            <th className="centradoTable">Tipo de Seguro</th>
            <th className="centradoTable">Fecha de Inicio</th>
            <th className="centradoTable">Fecha de Vencimiento</th>
            <th className="centradoTable">Monto Asegurado</th>
            <th className="centradoTable">Detalles Adicionales</th>
            <th className="centradoTable">ID Usuario</th>
            <th className="centradoTable">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {polizas.map((poliza) => (
            <tr key={poliza.id_poliza}>
              <td>{poliza.id_poliza}</td>
              <td className="centradoTable">{poliza.tipo_seguro}</td>
              <td className="centradoTable">{poliza.fecha_inicio}</td>
              <td className="centradoTable">{poliza.fecha_vencimiento}</td>
              <td className="centradoTable">S/. {poliza.monto_asegurado}</td>
              <td>{poliza.detalles_adicionales || "N/A"}</td>
              <td className="centradoTable">{poliza.id_usuario}</td>
              <td>
                <button className="BtnAcciones" onClick={() => handleEdit(poliza)}>
                  Editar
                  <svg viewBox="0 0 512 512" className="svgAcciones">
                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                  </svg>
                </button>
                <button className="BtnAcciones2" onClick={() => handleDelete(poliza.id_poliza)} style={{backgroundColor:"red;"}}>
                Eliminar
                <svg viewBox="0 0 512 512" className="svgAcciones">
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal para editar póliza */}
      {modalVisible && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
          <div className='card'>
              <div className="card__title">
                <h2>Editar Póliza</h2>
              </div>
              <form onSubmit={handleUpdate}>
                <div className="card__data">
                  <div className="card__right2">
                    <div className="item">
                      <label>Tipo de Seguro:</label>
                    </div>
                    <div className="item">
                      <label>Fecha de Inicio:</label>
                    </div>
                    <div className="item">
                      <label>Fecha de Vencimiento:</label>
                    </div>
                    <div className="item">
                      <label>Monto Asegurado:</label>
                    </div>
                    <div className="item">
                      <label>Detalles Adicionales:</label>
                    </div>
                    <div className="item">
                      <label>ID Usuario:</label>
                    </div>
                  </div>
                  <div className="card__left" style={{width:"40%;"}}>
                    <div className="item">
                      <input type="text" name="tipo_seguro" value={polizaSeleccionada.tipo_seguro} onChange={handleChange} required />
                    </div>
                    <div className="item">
                      <input type="date" name="fecha_inicio" value={polizaSeleccionada.fecha_inicio} onChange={handleChange} required />
                    </div>
                    <div className="item">
                      <input type="date" name="fecha_vencimiento" value={polizaSeleccionada.fecha_vencimiento} onChange={handleChange} required />
                    </div>
                    <div className="item">
                      <input type="number" name="monto_asegurado" value={polizaSeleccionada.monto_asegurado} onChange={handleChange} required />
                    </div>
                    <div className="item">
                      <input type="text" name="detalles_adicionales" value={polizaSeleccionada.detalles_adicionales} onChange={handleChange} required />
                    </div>
                    <div className="item">
                      <input type="number" name="id_usuario" value={polizaSeleccionada.id_usuario} onChange={handleChange} required />
                    </div>                    
                  </div>
                </div>
                <br/>
                <div className="contenedorPadre">
                  <div className="contenedorHijo">
                    <button className="btn-donate" type="submit">Guardar Cambios</button>&nbsp;
                    <button className="btn-donate" type="button" onClick={closeModal}>Cancelar</button>  
                  </div>
                </div><br/>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
// Estilos simples para el modal
const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};
const modalContentStyle = {
  backgroundColor: 'inherit',
  padding: '100%;',};

export default ListarPoliza;
