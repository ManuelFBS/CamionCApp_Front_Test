import { Link, useNavigate } from 'react-router-dom';
import { logoutRequest } from '../../../api/auth';
import { Button } from '../UI';

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
    <nav className="bg-zinc-700 my-2 mr-4 ml-4 mb-0 flex justify-between py-3 px-8 rounded-lg">
      <Link to={'/dashboard/admin'}>
        <h1 className="text-2xl font-bold mr-96">
          Dashboard Admin
        </h1>
      </Link>

      <Link
        to={'/login'}
        className="bg-indigo-500 ml-72 px-4 py-1 rounded-sm"
      >
        Login
      </Link>

      <Link
        to={'/employees'}
        className="bg-indigo-500 ml-4 px-4 py-1 rounded-sm"
      >
        Personal
      </Link>

      <Link
        to={'lock-unlock'}
        className="bg-indigo-500 ml-4 px-4 py-1 rounded-sm"
      >
        Usuario
      </Link>

      <Link
        to={'/'}
        className="bg-indigo-500 px-4 py-1 rounded-sm"
      >
        CContApp
      </Link>

      <button
        onClick={handleLogout}
        className="bg-indigo-500 px-4 py-1 rounded-sm"
      >
        Logout
      </button>
    </nav>
  );
}
