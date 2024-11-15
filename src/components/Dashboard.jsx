import { Link, Outlet, useNavigate } from 'react-router-dom';

const Dashboard = ({ onLogout }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        onLogout();
        navigate('/login'); // Redirige al login
    };
    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <nav className="col-md-3 col-lg-2 d-md-block bg-dark text-white sidebar p-3">
                    <h2 className="text-center">Seguros</h2>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <span className="nav-link text-white">Pólizas</span>
                            <ul className="nav flex-column ms-3">
                                <li className="nav-item">
                                    <Link to="polizas/lista" className="nav-link text-white">Listar Pólizas</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="polizas/crear" className="nav-link text-white">Crear Póliza</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="polizas/buscar" className="nav-link text-white">Buscar Póliza</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link text-white">Usuarios</span>
                            <ul className="nav flex-column ms-3">
                                <li className="nav-item">
                                    <Link to="usuarios/lista" className="nav-link text-white">Listar Usuarios</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="usuarios/crear" className="nav-link text-white">Crear Usuarios</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="usuarios/buscar" className="nav-link text-white">Buscar Usuarios</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>Cerrar Sesión</button>
                </nav>
                {/* Content */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="pt-3"><Outlet /></div>
                </main>
            </div>
        </div>
    );
};
export default Dashboard;