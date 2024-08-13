import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { loginCheck } from '../../api/auth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] =
    useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // if (isAuthenticated) return;
      try {
        const response = await loginCheck();

        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        if (
          error.response &&
          error.response.status === 401
        ) {
          setIsAuthenticated(false);
        } else {
          console.error(
            'Error al verificar la autenticación: ',
            error,
          );
        }
      } finally {
        setLoading(false);
      }
    };

    // checkAuth();
    if (isAuthenticated === null) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        logout,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
