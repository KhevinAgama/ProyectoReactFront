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
            
            <br/>
            <div className='card'>
            {mensaje && <p>{mensaje}</p>}
            <form onSubmit={handleSubmit}>
              <div className="card__title">
                <h2>Crear Nuevo Usuario</h2>
              </div>
                <div className="card__data">
                    <div className="card__right">
                        <div className='item'>
                            Nombre: 
                        </div>
                        <div className='item'>
                            Correo: 
                        </div>
                        <div className='item'>
                            DNI: 
                        </div>
                    </div>
                  <div className="card__left">
                    <div className="item">
                        <input type="text" name="nombre" value={usuario.nombre} onChange={handleChange} required />
                    </div>
                    <div className="item">
                        <input type="input" name="correo" value={usuario.correo} onChange={handleChange} required />
                    </div>
                    <div className="item">
                        <input type="number" name="dni" value={usuario.dni} onChange={handleChange} minLength={8} maxLength={8} required />
                    </div>
                  </div>
                </div>
                <br/>
                &nbsp;&nbsp;&nbsp;<button className='btn-donate' type="submit">Crear Usuario</button>
                <br/>&nbsp;<br/>
                </form>              
            </div>
        </div>
    );
};
export default CrearUsuario;