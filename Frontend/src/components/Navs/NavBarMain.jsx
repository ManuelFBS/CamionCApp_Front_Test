import { Link, useNavigate } from 'react-router-dom';
import { logoutRequest } from '../../../api/auth';
import { EmployeeDropdown } from '../Menu/EmployeeDropdown';
import { UserDropdown } from '../Menu/UserDropdown';
import { useAuth } from '../../context/AuthContext';
// import { Button } from '../UI';

export function NavBarMain() {
  const { logout, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logoutRequest();
      if (response.status === 200) {
        logout();
        navigate('/login');
        // window.location.reload();
      } else {
        console.error('Error al cerrar sesión');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
        <Link
          to={'/login'}
          className="pt-1 hover:text-yellow-200"
        >
          Login
        </Link>
        {/* <Link
          to={'/employees'}
          className="pt-1 hover:text-yellow-200"
        >
          Personal
        </Link> */}
        <EmployeeDropdown />
        {/* <Link
          to={'lock-unlock'}
          className="pt-1 hover:text-yellow-200"
        >
          Usuario
        </Link> */}
        <UserDropdown />
        <Link
          to={'/'}
          className="pt-1 hover:text-yellow-200"
        >
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
