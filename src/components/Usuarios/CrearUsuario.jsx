import { useState } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';

const CrearUsuario = () => {
    const [usuario, setUsuario] = useState({
        nombre: '',
        correo: '',
        dni: '',
    });
    const [mensaje, setMensaje] = useState('');
    const [errorBackend, setErrorBackend] = useState('');
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario({ ...usuario, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/usuarios/crearUsuario', usuario);
            // Enviar Correo Test
            // const emailParams = { to_email: usuario.correo, user_name: usuario.nombre, };
            emailjs.send('service_el4ux2o','template_04cfb4v', 
                { nombre: usuario.nombre, correo: usuario.correo,to_email: usuario.correo, user_name: usuario.nombre, }, 
                'Jj3sT1otIgqczN9Cw'
            );
            setMensaje('Usuario creada exitosamente.');
            setUsuario({
                nombre: '',
                correo: '',
                dni: '',
            });
            setErrorBackend('');
        } catch (error) {
            // setMensaje('Error al crear el usuario.'+ error);
            if (error.response && error.response.data && error.response.data.message) {
				setErrorBackend(error.response.data.message + ' Por favor corregirlo.');
                console.log(error.response.data.message);
			} else {
				setErrorBackend('Error al procesar la solicitud.');
			}
        }
    };
    return (
        <div className='contenedorPadre'>
            
            <br/>
            <div className='card'>
            {mensaje && <p>{mensaje}</p>}
            {errorBackend && <p style={{ color: 'white' }}>{errorBackend}</p>}
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