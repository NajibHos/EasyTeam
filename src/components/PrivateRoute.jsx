import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/* eslint-disable react/prop-types */
const PrivateRoute = ({ allowedRoles }) => {
  const { user, userRole } = useAuth();

  // If user is not logged in, redirect to login page
  if (!user) return <Navigate to="/login" replace />;

  // If user role is not allowed, redirect to the homepage or error page
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  // Render children if all checks pass
  return <Outlet />;
};

export default PrivateRoute;
