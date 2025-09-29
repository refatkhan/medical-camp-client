import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../provider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (!user) {
    // Redirect to signin page if not logged in
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
