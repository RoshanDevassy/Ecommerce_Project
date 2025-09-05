import axios from "axios";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children, requiredRole }) {
  const { role } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (localStorage.getItem("clientToken")) {
    try {
      const response = axios.get(`${import.meta.env.VITE_API_URI}/verifytoken`,{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem('clientToken')}`
        }
      });

      if (response.data.message !== "Token Verified")
        throw new Error("Token Expired");
    } catch (error) {
      localStorage.removeItem("clientToken");
    }
  }

  if (!role) return <Navigate to="/login" />;

  if (!requiredRole) return children;
  else if (requiredRole != role) {
    toast.info("Login with Admin Credentials");
  } else if (Boolean(requiredRole) && requiredRole == role) return children;
}
