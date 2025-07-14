import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const PublicRoute = ({ restricted = false }) => {
  const { currentUser } = useAuth();

  if (restricted && currentUser) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default PublicRoute;