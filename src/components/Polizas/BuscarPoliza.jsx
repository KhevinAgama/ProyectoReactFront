import { useState, useEffect } from 'react';
import axios from 'axios';

const BuscarPolizaPorId = () => {
  const [polizaId, setPolizaId] = useState('');
  const [poliza, setPoliza] = useState(null);
  const [error, setError] = useState('');
  const [polizas, setPolizas] = useState([]);

  useEffect(() => {
		const fetchUsuarios = async () => {
			try {
				const response = await axios.get('http://localhost:8080/polizas/listarPoliza');
				setPolizas(response.data);
			} catch (error) {
				console.error('Error al cargar las polizas:');
				setPolizas('Error al cargar la lista de Polizas.');
			}
		};
		fetchUsuarios();
	}, []);

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
        {/* <input type="number" placeholder="Ingrese ID de la póliza" value={polizaId} onChange={(e) => setPolizaId(e.target.value)} min="1" />&nbsp;&nbsp;&nbsp; */}
        <select onChange={(e) => setPolizaId(e.target.value)} required >
				  <option value="">Seleccione el ID Póliza</option>
					{polizas.map((poliza) => (
					<option key={poliza.id_poliza} value={poliza.idUsuario}>
						{poliza.id_poliza}
					</option>
					))}
				</select>&nbsp;&nbsp;&nbsp;
      <button className="btn-donate" onClick={handleSearch}>Buscar</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {poliza && (
        <div>
          <br/>
          <div className='card'>
              <div className="card__title">
                <h2>Detalles de la Póliza</h2>
              </div>
                <div className="card__data">
                  <div className="card__right3">
                    <div className="item">
                      <strong>Tipo de Seguro:</strong> {poliza.tipo_seguro}
                    </div>
                    <div className="item">
                      <strong>Fecha de Inicio:</strong> {poliza.fecha_inicio}
                    </div>
                    <div className="item">
                      <strong>Fecha de Vencimiento:</strong> {poliza.fecha_vencimiento}
                    </div>
                    <div className="item">
                      <strong>Monto Asegurado:</strong> {poliza.monto_asegurado}
                    </div>
                    <div className="item">
                      <strong>Detalles Adicionales:</strong> {poliza.detalles_adicionales}
                    </div>
                    <div className="item">
                      <strong>ID Usuario Asociado:</strong> {poliza.id_usuario}
                    </div>
                  </div>
                </div>
                <br/>              
            </div>
        </div>
      )}
    </div>
  );
};
  export default BuscarPolizaPorId;