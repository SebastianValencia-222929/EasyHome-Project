import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const STORAGE_KEY = 'easyhome_auth_user';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      }
      setError(null);
      setLoading(false);
    } catch (err) {
      setUser(null);
      setError(err);
      setLoading(false);
    }
  };

  const createUserObject = (profile) => ({
    profile,
    groups: profile['cognito:groups'] || [],
  });

  const login = async (email, password) => {
    try {
      const profile = {
        email,
        name: email.split('@')[0],
        sub: `local-${email}`,
        phone_number: '',
        'cognito:groups': ['Clientes'],
      };

      const userObj = createUserObject(profile);
      setUser(userObj);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userObj));
      setError(null);
    } catch (err) {
      console.error('Error en login:', err);
      throw err;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const email = 'user@example.com';
      const profile = {
        email,
        name: 'Usuario Google',
        sub: `google-${email}`,
        phone_number: '',
        'cognito:groups': ['Clientes'],
      };

      const userObj = createUserObject(profile);
      setUser(userObj);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userObj));
      setError(null);
    } catch (err) {
      console.error('Error en login con Google:', err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Error en logout:', err);
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      await login(userData.email, userData.password);
    } catch (err) {
      console.error('Error en registro:', err);
      throw err;
    }
  };

  const hasRole = (role) => {
    if (!user || !user.groups) return false;
    return user.groups.includes(role);
  };

  const getUserRole = () => {
    if (!user || !user.groups) return null;

    if (user.groups.includes('Admin')) return 'Admin';
    if (user.groups.includes('Trabajadores')) return 'Trabajadores';
    if (user.groups.includes('Clientes')) return 'Clientes';

    return null;
  };

  const value = {
    user,
    loading,
    error,
    login,
    loginWithGoogle,
    logout,
    register,
    hasRole,
    getUserRole,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
