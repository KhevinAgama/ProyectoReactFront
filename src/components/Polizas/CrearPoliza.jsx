import { useState } from 'react';
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
    const [mensaje, setMensaje] = useState('');
    const handleChange = (e) => {
        //console.log(poliza);
        const { name, value } = e.target;
        setPoliza({ ...poliza, [name]: value });
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
            <h2>Crear Nueva Póliza</h2>
            {mensaje && <p>{mensaje}</p>}
            <form onSubmit={handleSubmit}>
                <label>Tipo de Seguro: 
                    <input type="text" name="tipo_seguro" value={poliza.tipo_seguro} onChange={handleChange} required />
                </label><br />
                <label>Fecha de Inicio: 
                    <input type="date" name="fecha_inicio" value={poliza.fecha_inicio} onChange={handleChange} required />
                </label><br />
                <label>Fecha de Vencimiento: 
                    <input type="date" name="fecha_vencimiento" value={poliza.fecha_vencimiento} onChange={handleChange} required />
                </label><br />
                <label>Monto Asegurado:
                    <input type="number" name="monto_asegurado" value={poliza.monto_asegurado} onChange={handleChange} required />
                </label><br />
                <label>Detalles Adicionales: 
                    <textarea name="detalles_adicionales" value={poliza.detalles_adicionales} onChange={handleChange} ></textarea>
                </label><br />
                <label>ID Usuario:  
                    <input name="id_usuario" value={poliza.id_usuario} onChange={handleChange} required/>
                </label><br />
                <button type="submit">Crear Póliza</button>
            </form>
        </div>
    );
};
export default CrearPoliza;