import { Link, useNavigate } from 'react-router-dom';
import { logoutRequest } from '../../../api/auth';


export function NavBarMain() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logoutRequest();
      if (response.status === 200) {
        navigate('/login');
      } else {
        console.error('Error al cerrar sesión');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <nav className="bg-gray-800 py-3 px-8 rounded-lg flex justify-between items-center">
      <Link to={'/dashboard/admin'} className="text-2xl font-bold text-white">       
          Dashboard Admin        
      </Link>
      <div className="flex space-x-4">
      <Link
        to={'/login'}
        className=" text-white px-4 py-2 hover:text-red-600 transition-colors"
      >
        Login
      </Link>

      <Link
        to={'/employees'}
        className="text-white px-4 py-2  hover:text-red-600 transition-colors"
      >
        Personal
      </Link>

      <Link
        to={'lock-unlock'}
        className="text-white px-4 py-2 hover:text-red-600 transition-colors"
      >
        Registro
      </Link>

      <Link
        to={'/home'}
        className="text-white px-4 py-2 hover:text-red-600 transition-colors"
      >
        Servicios
      </Link>

      <button
        onClick={handleLogout}
        className="text-white px-4 py-2 hover:text-red-600 transition-colors"
      >
        Logout
      </button>
      </div>
    </nav>
  );
}
