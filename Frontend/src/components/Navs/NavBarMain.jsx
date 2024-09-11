/* eslint-disable no-unused-vars */
import { Link, useNavigate } from 'react-router-dom';
import { logoutRequest } from '../../../api/auth';
import { EmployeeDropdown } from '../Menu/EmployeeDropdown';
import { UserDropdown } from '../Menu/UserDropdown';
import { useAuth } from '../../context/AuthContext';

export function NavBarMain() {
    const { logout, setIsAuthenticated, userRole } = useAuth();
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
            <div>
                <Link to={'/dashboard/admin'}>
                    <h1 className="text-2xl font-bold mr-96">
                        Dashboard Admin
                    </h1>
                </Link>
            </div>

            <div className="w-96 flex justify-between mr-4 font-tahoma font-medium">
                <Link to={'/login'} className="pt-1 hover:text-yellow-200">
                    Login
                </Link>
                {isAuthorized ? (
                    <>
                        <EmployeeDropdown />
                        <UserDropdown />
                    </>
                ) : (
                    <Link
                        to="/unauthorized"
                        className="pt-1 hover:text-yellow-300"
                    >
                        No Permitido...
                    </Link>
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
