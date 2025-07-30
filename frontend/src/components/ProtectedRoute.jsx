import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children, requiredRole }) {
  const { role } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!role) return <Navigate to="/login" />;

  if (!requiredRole) return children;
  else if (requiredRole != role) {
    alert("You are not Admin");
  } else if (Boolean(requiredRole) && requiredRole == role) return children;
}
