/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loading } from '../../components/Loading/Loading';

export const ProtectedRoute = ({ children, allowedRoles }) => {
    // const isAuthenticated = document.cookie
    //   .split('; ')
    //   .find((row) => row.startsWith('auth-token='))
    //   ?.split('=')[1];

    // if (!isAuthenticated) {
    //   return <Navigate to="/login" replace />;
    // }

    const { isAuthenticated, loading, userRole } = useAuth();

    console.log('Rol del usuario:', userRole); //////////////////////

    if (loading) {
        return <Loading />; // Muestra indicador de carga mientras se verifica la autenticación...
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // se verifica si el rol del usuario está permitido...
    // if (allowedRoles && !allowedRoles.includes(userRole)) {
    //     return <Navigate to="/unauthorized" replace />;
    // }
    if (allowedRoles && Array.isArray(userRole)) {
        const hasAccess = userRole.some((role) => allowedRoles.includes(role));

        if (!hasAccess) {
            return <Navigate to="/unauthorized" replace />;
        }
    }

    return children;
};
