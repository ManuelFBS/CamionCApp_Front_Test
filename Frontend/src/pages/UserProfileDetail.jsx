
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake, faIdCard } from '@fortawesome/free-solid-svg-icons';

const UserProfileDetail = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  
  useEffect(() => {
    const userId = "66ad7a5ff26475e77e6cdb62"; // Cambia a la ID del usuario que deseas mostrar
    dispatch(fetchUser(userId));
  }, [dispatch]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No se encontró información del usuario.</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl text-gray-600 font-bold text-center mb-6">Detalle del Perfil de Usuario</h1>
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl text-gray-600 font-semibold mb-4">{user.nombres} {user.apellidos}</h2>
        
        <div className="mb-4 text-gray-600">
          <div className='flex items-center'>
            <FontAwesomeIcon icon={faIdCard} className='mr-2' />
          <strong>Cédula:</strong> {user.cedula}
        </div>
        <hr className='border-gray-300 my-1'/>
        </div>

        <div className="mb-4 text-gray-600">
          <div className='flex items-center'>
            <FontAwesomeIcon icon={faBirthdayCake} className='mr-2' />
          <strong>Fecha de Nacimiento:</strong> {new Date(user.fecha_nacimiento).toLocaleDateString()}
        </div>
        <hr className='border-gray-300 my-1' />
        </div>

        <div className="mb-4 text-gray-600">
          <strong>Correo:</strong> {user.correo}
        </div>

        <div className="mb-4 text-gray-600">
          <strong>Teléfono:</strong> {user.telefono}
        </div>

        <div className="mb-4 text-gray-600">
          <strong>Fecha de Inicio de Contrato:</strong> {new Date(user.fecha_inicio_contrato).toLocaleDateString()}
        </div>

        {user.fecha_final_contrato && (
          <div className="mb-4 text-gray-600">
            <strong>Fecha Final de Contrato:</strong> {new Date(user.fecha_final_contrato).toLocaleDateString()}
          </div>
        )}

        <div className="mb-4 text-gray-600">
          <strong>Tipo de Contrato:</strong> {user.tipo_de_contrato}
        </div>

        <h3 className="text-xl  text-gray-600 font-bold mt-6 mb-4">Documentos</h3>
        
        <div className="flex flex-col">
          {user.licencias && user.licencias.length > 0 && (
            <div className="mb-4 text-gray-600">
              <strong>Licencias:</strong>
              <ul>
                {user.licencias.map((licencia, index) => (
                  <li key={index}>
                    <img src={licencia.url} alt={`Licencia ${index + 1}`} className="w-32 h-20 object-cover text-gray-600" />
                  </li>
                ))}
              </ul>
            </div>

          )}
          {user.vehiculos && user.vehiculos.length > 0 && (
            <div className="mb-4 text-gray-600">
              <strong>Vehículos:</strong>
              <ul>
                {user.vehiculos.map((vehiculo, index) => (
                  <li key={index}>
                    {vehiculo.nombre} (ID: {vehiculo._id})
                  </li>
                ))}
              </ul>
            </div>

          )}
          {user.volquetas && user.volquetas.length > 0 && (
            <div className="mb-4 text-gray-600">
              <strong>Volquetas:</strong>
              <ul>
                {user.volquetas.map((volqueta, index) => (
                  <li key={index}>
                    {volqueta.nombre} (ID: {volqueta._id})
                  </li>
                ))}
              </ul>
            </div>

          )}
          {user.tanqueos && user.tanqueos.length > 0 && (
            <div className="mb-4 text-gray-600">
              <strong>Tanqueos:</strong>
              <ul>
                {user.tanqueos.map((tanqueo, index) => (
                  <li key={index}>
                    {tanqueo.fecha} (ID: {tanqueo._id})
                  </li>
                ))}
              </ul>
            </div>

          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileDetail;
