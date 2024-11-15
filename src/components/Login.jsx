import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === '1234') {
            setIsAuthenticated(); // Cambia el estado global
            navigate('/dashboard'); // Redirige al dashboard
        } else {
            alert('Credenciales incorrectas');
        }
    };
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div style={{ width: '400px' }}>
                <h3 className="text-center mb-4">Iniciar Sesión</h3>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Usuario</label>
                        <input type="text" className="form-control" placeholder="Ingresa tu usuario" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input type="password" className="form-control" placeholder="Ingresa tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Ingresar</button>
                </form>
            </div>
        </div>
    );
};
export default Login;