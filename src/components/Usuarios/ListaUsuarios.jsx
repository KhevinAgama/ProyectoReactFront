import { useEffect, useState } from "react";
import axios from "axios";
import "../estilos/botones.css";
import "../estilos/tabla.css";

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [errorBackend, setErrorBackend] = useState('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/usuarios/obtenerUsuarios"
        );
        setUsuarios(response.data);
      } catch (error) {
        setMensaje("Error al cargar los usuarios");
        console.error(error);
      }
    };
    fetchUsuarios();
  }, []);
  const handleDelete = async (id_usuario) => {
    try {
      await axios.delete(
        `http://localhost:8080/usuarios/eliminarUsuario/${id_usuario}`
      );
      setUsuarios(
        usuarios.filter((usuario) => usuario.id_usuario !== id_usuario)
      );
      setMensaje("Usuario eliminado exitosamente.");
    } catch (error) {
      setMensaje("Error al eliminar el usuario.");
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
      await axios.put(
        `http://localhost:8080/usuarios/actualizarUsuario/${usuarioSeleccionado.id_usuario}`,
        usuarioSeleccionado
      );
      setMensaje("Póliza actualizada exitosamente.");
      setUsuarios(
        usuarios.map((usuario) =>
          usuario.id_usuario === usuarioSeleccionado.id_usuario
            ? usuarioSeleccionado
            : usuario
        )
      );
      closeModal();
      setErrorBackend('');
    } catch (error) {
      // setMensaje("Error al actualizar el usuario.");
      // console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
				setErrorBackend(error.response.data.message + ' Por favor corregirlo.');
                console.log(error.response.data.message);
			} else {
				setErrorBackend('Error al procesar la solicitud.');
			}
    }
  };
  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuarioSeleccionado({ ...usuarioSeleccionado, [name]: value });
  };
  return (
    <div>
      <h2>Listado de Usuarios</h2>
      {mensaje && <p>{mensaje}</p>}
      <table className="blueTable">
        <thead>
          <tr>
            <th className="centradoTable">ID</th>
            <th className="centradoTable">Nombre Usuario</th>
            <th className="centradoTable">Correo Usuario</th>
            <th className="centradoTable">DNI Usuario</th>
            <th className="centradoTable">Acciones</th>
          </tr>
        </thead>        
        <tbody>
        {usuarios.map((usuario) => (
            <tr key={usuario.id_usuario}>
              <td className="centradoTable">{usuario.id_usuario}</td>
              <td className="centradoTable">{usuario.nombre}</td>
              <td className="centradoTable">{usuario.correo}</td>
              <td className="centradoTable">{usuario.dni}</td>
              <td>
                <div className="contenedorPadre">
                  <div className="contenedorHijo">
                  <button
                  className="BtnAcciones"
                  onClick={() => handleEdit(usuario)}
                >
                  Editar
                  <svg viewBox="0 0 512 512" className="svgAcciones">
                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                  </svg>
                </button>
                <button
                  className="BtnAcciones2"
                  onClick={() => handleDelete(usuario.id_usuario)}
                >
                  Eliminar
                  <svg viewBox="0 0 512 512" className="svgAcciones">
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                  </svg>
                </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal para editar póliza */}
      {modalVisible && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <div className="card">
              <div className="card__title">
                <h2>Editar Usuario</h2>
              </div>
              {errorBackend && <p style={{ color: 'red' }}>{errorBackend}</p>}
              <form onSubmit={handleUpdate}>
                <div className="card__data">
                  <div className="card__right">
                    <div className="item">
                      <label>Nombre:</label>
                    </div>
                    <div className="item">
                      <label>Correo:</label>
                    </div>
                    <div className="item">
                      <label>DNI:</label>
                    </div>
                  </div>
                  <div className="card__left">
                    <div className="item">
                      <input
                        type="text"
                        name="nombre"
                        value={usuarioSeleccionado.nombre}
                        onChange={handleChange}
                        style={{ borderBlock: "none;" }}
                        required
                      />
                    </div>
                    <div className="item">
                      <input
                        type="text"
                        name="correo"
                        value={usuarioSeleccionado.correo}
                        onChange={handleChange}
                        style={{ borderBlock: "none;" }}
                        required
                      />
                    </div>
                    <div className="item">
                      <input
                        type="text"
                        name="dni"
                        value={usuarioSeleccionado.dni}
                        onChange={handleChange}
                        style={{ borderBlock: "none;" }}
                        required
                      />
                    </div>
                  </div>
                </div>
                <br />
                <div className="contenedorPadre">
                  <div className="contenedorHijo">
                    <button className="btn-donate" type="submit">
                      Guardar Cambios
                    </button>
                    &nbsp;
                    <button
                      className="btn-donate"
                      type="button"
                      onClick={closeModal}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
                <br />
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
  backgroundColor: "inherit",
  padding: "100%;",
};
export default ListarUsuarios;
