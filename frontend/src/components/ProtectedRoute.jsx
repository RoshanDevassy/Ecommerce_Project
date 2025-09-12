import axios from "axios";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children, requiredRole }) {
  const { role, token } = useSelector((state) => state.auth);

  if (!role || !token) {
    toast.info("Login to Continue");
    return <Navigate to="/login" />;
  }

  if (!requiredRole) return children;
  else if (requiredRole != role) {
    toast.info("Login with Admin Credentials");
  } else if (Boolean(requiredRole) && requiredRole == role) return children;
}
