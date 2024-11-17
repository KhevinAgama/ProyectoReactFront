import { useState, useEffect } from 'react';
import axios from 'axios';
const CrearPoliza = () => {
    const [poliza, setPoliza] = useState({
        tipo_seguro: '',
        fecha_inicio: '',
        fecha_vencimiento: '',
        monto_asegurado: '',
        detalles_adicionales: '',
        id_usuario: '',
    });
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
    const handleChange = (e) => {
        //console.log(poliza);
        const { name, value } = e.target;
        setPoliza({ ...poliza, [name]: value.trimStart() });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/polizas/crearPoliza', poliza);
            setMensaje('Póliza creada exitosamente.');
            setPoliza({
                tipo_seguro: '',
                fecha_inicio: '',
                fecha_vencimiento: '',
                monto_asegurado: '',
                detalles_adicionales: '',
                id_usuario: '',
            });
        } catch (error) {
            setMensaje('Error al crear la póliza.'+ error);
        }
    };
    return (
        <div>
           <br/>
            <div className='card'>
            {mensaje && <p>{mensaje}</p>}
            <form onSubmit={handleSubmit}>
              <div className="card__title">
                <h2>Crear Nueva Póliza</h2>
              </div>
                <div className="card__data">
                    <div className="card__right2">
                        <div className='item'>
                            Tipo de Seguro: 
                        </div>
                        <div className='item'>
                            Fecha de Inicio: 
                        </div>
                        <div className='item'>
                            Fecha de Vencimiento: 
                        </div>
                        <div className='item'>
                            Monto Asegurado:
                        </div>
                        <div className='item'>
                            Detalles Adicionales:
                        </div>
                        <div className='item'>
                            ID Usuario: 
                        </div>
                    </div>
                  <div className="card__left">
                    <div className="item">
                    <select name="tipo_seguro" value={poliza.tipo_seguro} onChange={handleChange} required>
                        <option value="">Seleccione un tipo de seguro</option>
                        <option value="auto">auto</option>
                        <option value="celular">celular</option>
                        <option value="inmueble">inmueble</option>
                    </select>
                    </div>
                    <div className="item">
                    <input type="date" name="fecha_inicio" value={poliza.fecha_inicio} onChange={handleChange} required />
                    </div>
                    <div className="item">
                    <input type="date" name="fecha_vencimiento" value={poliza.fecha_vencimiento} onChange={handleChange} required />
                    </div>
                    <div className="item">
                    <input type="number" name="monto_asegurado" value={poliza.monto_asegurado} onChange={handleChange} min="0" required />
                    </div>
                    <div className="item">
                    <input type="text" name="detalles_adicionales" value={poliza.detalles_adicionales} onChange={handleChange} min="0" required />
                    </div>
                    {/* <div className="item">
                    <input type="number" name="id_usuario" value={poliza.id_usuario} onChange={handleChange} min="0" required/>
                    </div> */}
                    <div className="item">
						<select name="id_usuario" value={poliza.id_usuario} onChange={handleChange} required >
							<option value="">Seleccione un usuario</option>
							{usuarios.map((usuario) => (
								<option key={usuario.id_usuario} value={usuario.id_usuario}>
									{usuario.nombre}
								</option>
							))}
						</select>
					</div>
                  </div>
                </div>
                <br/>
                &nbsp;&nbsp;&nbsp;<button className='btn-donate' type="submit">Crear Póliza</button>
                <br/>&nbsp;<br/>
                </form>              
            </div>

        </div>
    );
};
export default CrearPoliza;