import { Link, Outlet, useNavigate } from 'react-router-dom';
import './estilos/header.css'
import imagen from './image/UMSA-_LOGO.png'

const Dashboard = ({ onLogout }) => {
    const navigate = useNavigate();
    const handleRefresh = () => {
        navigate('/dashboard') 
    };
    const handleLogout = () => {
        onLogout();
        navigate('/login'); // Redirige al login
    };
    return (
        <div className="container-fluid d-flex vh-100" style={{width: "100%"}}>
            <div>
                <ul>
                    <li className="dropdown3">
                        <img src={imagen} onClick={handleRefresh} />
                        
                    </li>
                    <li className="dropdown">
                        <a href="javascript:void(0)" className="dropbtn">Pólizas</a>
                        <div className="dropdown-content">
                            <a>
                                <Link to="polizas/lista">Listar Pólizas</Link>    
                            </a>
                                <a><Link to="polizas/crear">Crear Póliza</Link></a>
                            <a><Link to="polizas/buscar">Buscar Póliza</Link></a>
                        </div>
                    </li>
                    <li className="dropdown">
                        <a href="javascript:void(0)" className="dropbtn">Usuarios</a>
                        <div className="dropdown-content">
                            <a><Link to="usuarios/lista">Listar Usuarios</Link></a>
                            <a><Link to="usuarios/crear">Crear Usuarios</Link></a>
                            <a><Link to="usuarios/buscar">Buscar Usuarios</Link></a>
                        </div>
                    </li>
                    <li className="dropdown2">
                        <button className="btn-donate" onClick={handleLogout}>Cerrar Sesión</button>
                    </li>
                </ul>
            </div>
            
                
            <h1>Bienvenidos a SegurAl</h1>
            {/* Content */}
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="pt-3"><Outlet /></div>
            </main>
            
        </div>
    );
};
export default Dashboard;
