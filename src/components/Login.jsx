import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        // Simulación de autenticación
        if (username === 'admin' && password === '1234') {
            setIsAuthenticated(true); 
            // Actualiza el estado de autenticación
            navigate('/dashboard'); 
            // Redirige al dashboard
        } else {
        alert('Credenciales incorrectas');
        }
    };
    return (
        <div className="container">
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <div>
                    <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
};
export default Login;