import { useState } from 'react';
//import api from '../services/api';
import axios from 'axios';

const BuscarPolizaPorId = () => {
  const [polizaId, setPolizaId] = useState('');
  const [poliza, setPoliza] = useState(null);
  const [error, setError] = useState('');
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/polizas/obtenerPolizaPorId/${polizaId}`);
      setPoliza(response.data);
      setError('');
    } catch (err) {
      setError('No se encontró la póliza con el ID proporcionado.');
      setPoliza(null);
    }
  };
  return (
    <div>
      <h2>Buscar Póliza por ID</h2>
      <input type="text" placeholder="Ingrese ID de la póliza" value={polizaId} onChange={(e) => setPolizaId(e.target.value)} />
      <button onClick={handleSearch}>Buscar</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {poliza && (
        <div>
          <h3>Detalles de la Póliza</h3>
          <p><strong>ID:</strong> {poliza.id_poliza}</p>
          <p><strong>Tipo de Seguro:</strong> {poliza.tipo_seguro}</p>
          <p><strong>Fecha de Inicio:</strong> {poliza.fecha_inicio}</p>
          <p><strong>Fecha de Vencimiento:</strong> {poliza.fecha_vencimiento}</p>
          <p><strong>Monto Asegurado:</strong> {poliza.monto_asegurado}</p>
          <p><strong>Detalles Adicionales:</strong> {poliza.detalles_adicionales}</p>
          <p><strong>ID Usuario Asociado:</strong> {poliza.id_usuario}</p>
          </div>
      )}
    </div>
  );
};
  export default BuscarPolizaPorId;