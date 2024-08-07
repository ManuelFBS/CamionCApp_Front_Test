
import { useNavigate } from 'react-router-dom'; // Para la navegación
import logo from '../assets/logosinfondo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const Header = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleProfileClick = () => {
    navigate('/user-profile'); // Redirige a la página del perfil del usuario
  };

  return (
    <header className="flex bg-red-500 items-center justify-between p-4">
      <button
        className="text-xl p-2 rounded-full hover:bg-gray-600"
        onClick={handleBackClick}
      >
        <FontAwesomeIcon
          icon={faArrowLeft} 
          className="h-6 w-6 text-white-600"
        />
      </button>
      <div className="flex-1 text-center">
        <img
          className="h-32 mx-auto"
          src={logo}
          alt="Company Logo"
        />
      </div>
      <div
        className="flex items-center cursor-pointer p-2 rounded-full hover:bg-gray-600"
        onClick={handleProfileClick}
      >
        
        <FontAwesomeIcon
          icon={faUser} 
          className="h-10 w-10 text-white-600"
        />

      </div>
    </header>
  );
};

export default Header;
