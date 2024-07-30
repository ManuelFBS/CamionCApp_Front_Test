import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = document.cookie
    .split('; ')
    .find((row) => row.startsWith('auth-token='))
    ?.split('=')[1];

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
