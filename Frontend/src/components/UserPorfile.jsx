
import  { useEffect, useState } from 'react';
import axios from 'axios'; 

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    axios.get('/api/user-profile')
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center">Cargando...</div>;
  if (error) return <div className="text-center text-red-500">Error al cargar los datos</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Perfil del Usuario</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <strong>Cédula:</strong> {user.cedula}
        </div>
        <div className="mb-4">
          <strong>Nombres:</strong> {user.nombres}
        </div>
        <div className="mb-4">
          <strong>Apellidos:</strong> {user.apellidos}
        </div>
        <div className="mb-4">
          <strong>Fecha de Nacimiento:</strong> {new Date(user.fecha_nacimiento).toLocaleDateString()}
        </div>
        <div className="mb-4">
          <strong>Correo:</strong> {user.correo}
        </div>
        <div className="mb-4">
          <strong>Teléfono:</strong> {user.telefono}
        </div>
        <div className="mb-4">
          <strong>Fecha de Inicio de Contrato:</strong> {new Date(user.fecha_inicio_contrato).toLocaleDateString()}
        </div>
        <div className="mb-4">
          <strong>Fecha Final de Contrato:</strong> {user.fecha_final_contrato ? new Date(user.fecha_final_contrato).toLocaleDateString() : 'No especificada'}
        </div>
        <div className="mb-4">
          <strong>Tipo de Contrato:</strong> {user.tipo_de_contrato}
        </div>
        <div className="mb-4">
          <strong>Licencias:</strong> {user.licencias.length > 0 ? user.licencias.join(', ') : 'No tiene licencias'}
        </div>
        <div className="mb-4">
          <strong>Vehículos:</strong> {user.vehiculos.length > 0 ? user.vehiculos.join(', ') : 'No tiene vehículos'}
        </div>
        <div className="mb-4">
          <strong>Volquetas:</strong> {user.volquetas.length > 0 ? user.volquetas.join(', ') : 'No tiene volquetas'}
        </div>
        <div className="mb-4">
          <strong>Tanqueos:</strong> {user.tanqueos.length > 0 ? user.tanqueos.join(', ') : 'No tiene tanqueos'}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
