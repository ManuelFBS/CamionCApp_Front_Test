import { createContext, useContext, useEffect, useState } from 'react';
import { loginCheck } from '../../api/auth';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await loginCheck();

                setIsAuthenticated(response.data.isAuthenticated);
            } catch (error) {
                setIsAuthenticated(false);
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
