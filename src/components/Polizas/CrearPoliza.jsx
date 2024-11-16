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
            <h2>Crear Nueva Póliza</h2>
            {mensaje && <p>{mensaje}</p>}
            <form onSubmit={handleSubmit}>
                <label>Tipo de Seguro: 
                    {/* <input type="text" name="tipo_seguro" value={poliza.tipo_seguro} onChange={handleChange} required /> */}
                    <select name="tipo_seguro" value={poliza.tipo_seguro} onChange={handleChange} required>
                        <option value="">Seleccione un tipo de seguro</option>
                        <option value="auto">auto</option>
                        <option value="celular">celular</option>
                        <option value="inmueble">inmueble</option>
                    </select>
                </label><br />
                <label>Fecha de Inicio: 
                    <input type="date" name="fecha_inicio" value={poliza.fecha_inicio} onChange={handleChange} required />
                </label><br />
                <label>Fecha de Vencimiento: 
                    <input type="date" name="fecha_vencimiento" value={poliza.fecha_vencimiento} onChange={handleChange} required />
                </label><br />
                <label>Monto Asegurado:
                    <input type="number" name="monto_asegurado" value={poliza.monto_asegurado} onChange={handleChange} min="0" required />
                </label><br />
                <label>Detalles Adicionales: 
                    <textarea name="detalles_adicionales" value={poliza.detalles_adicionales} onChange={handleChange} ></textarea>
                </label><br />
                <label>ID Usuario:  
                    <input type="number" name="id_usuario" value={poliza.id_usuario} onChange={handleChange} min="0" required/>
                </label><br />
                <button type="submit">Crear Póliza</button>
            </form>
        </div>
    );
};
export default CrearPoliza;