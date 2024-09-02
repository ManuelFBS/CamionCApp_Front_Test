import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loading } from '../../components/Loading/Loading';

export const ProtectedRoute = ({ children }) => {
    // const isAuthenticated = document.cookie
    //   .split('; ')
    //   .find((row) => row.startsWith('auth-token='))
    //   ?.split('=')[1];

    // if (!isAuthenticated) {
    //   return <Navigate to="/login" replace />;
    // }

    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <Loading />; // Muestra indicador de carga mientras se verifica la autenticación...
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
