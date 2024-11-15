import { useState } from 'react';
import axios from 'axios';
const CrearUsuario = () => {
    const [usuario, setUsuario] = useState({
        nombre: '',
        correo: '',
        dni: '',
    });
    const [mensaje, setMensaje] = useState('');
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario({ ...usuario, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/usuarios/crearUsuario', usuario);
            setMensaje('Usuario creada exitosamente.');
            setUsuario({
                nombre: '',
                correo: '',
                dni: '',
            });
        } catch (error) {
            setMensaje('Error al crear el usuario.'+ error);
        }
    };
    return (
        <div>
            <h2>Crear Nueva Usuario</h2>
            {mensaje && <p>{mensaje}</p>}
            <form onSubmit={handleSubmit}>
                <label>Nombre: 
                    <input type="text" name="nombre" value={usuario.nombre} onChange={handleChange} required />
                </label><br />
                <label>Correo: 
                    <input type="input" name="correo" value={usuario.correo} onChange={handleChange} required />
                </label><br />
                <label>DNI: 
                    <input type="number" name="dni" value={usuario.dni} onChange={handleChange} required />
                </label><br />
                <button type="submit">Crear Usuario</button>
            </form>
        </div>
    );
};
export default CrearUsuario;