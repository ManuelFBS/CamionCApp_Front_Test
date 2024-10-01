/* eslint-disable no-unused-vars */
import { Link, useNavigate } from 'react-router-dom';
import { logoutRequest } from '../../../api/auth';
import { EmployeeDropdown } from '../Menu/EmployeeDropdown';
import { UserDropdown } from '../Menu/UserDropdown';
import { EmployeeFormDropdown } from '../Menu/EmployeesFormDropdown';
import { VehicleFormDropdown } from '../Menu/VehicleFormDropdown';
import { useAuth } from '../../context/AuthContext';

export function NavBarMain() {
    const { logout, setIsAuthenticated, userRole, userName } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await logoutRequest();
            if (response.status === 200) {
                logout();
                navigate('/');
            } else {
                console.error('Error al cerrar sesión');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const isAuthorized =
        userRole === import.meta.env.VITE_RAD ||
        userRole === import.meta.env.VITE_ROW;

    return (
        <nav className="bg-red-600 my-2 mr-4 ml-4 mb-0 flex justify-between py-3 px-8 rounded-lg">
            <div className="relative group">
                {/* <Link to={'/dashboard/admin'}> */}
                <Link to={'/'}>
                    <img
                        src="src/assets/YadiraMayac_logoB&W_Size20PrcOrigin.png"
                        alt="log"
                        className="h-10 w-auto -m-1.5"
                    />
                </Link>
                {/* Tooltip customizado... */}
                <span className="absolute z-50 left-1/2 transform -translate-x-1/2 translate-y-6 bg-red-500 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    ir a Inicio
                </span>
            </div>

            <div className="w-96 flex justify-between mr-4 font-tahoma font-medium">
                <Link to={'/login'} className="pt-1 hover:text-yellow-200">
                    Login
                </Link>
                {isAuthorized ? (
                    <>
                        <EmployeeDropdown />
                        <UserDropdown />
                        <VehicleFormDropdown />
                    </>
                ) : (
                    <>
                        <Link
                            to="/unauthorized"
                            className="pt-1 hover:text-yellow-300"
                        >
                            No Permitido...
                        </Link>
                        <Link className="pt-0 hover:text-yellow-300">
                            <EmployeeFormDropdown />
                        </Link>
                    </>
                )}
                <Link to={'/'} className="pt-1 hover:text-yellow-200">
                    Home
                </Link>

                <button
                    onClick={handleLogout}
                    className="bg-transparent  hover:text-yellow-200"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}
