import axios from "axios";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default async function ProtectedRoute({ children, requiredRole }) {
  const navigate = useNavigate();

  const { role } = useSelector((state) => state.auth);

  if (localStorage.getItem("clientToken")) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URI}/verifytoken`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("clientToken")}`,
          },
        }
      );

      console.info(response);
      if (response.data.message !== "Token Verified")
        localStorage.removeItem("clientToken");
      throw new Error("Token Expired");
    } catch (error) {
      toast.error(`${error}`);
      return <Navigate to="/login" />;
    }
  }

  if (!role) return <Navigate to="/login" />;

  if (!requiredRole) return children;
  else if (requiredRole != role) {
    toast.info("Login with Admin Credentials");
  } else if (Boolean(requiredRole) && requiredRole == role) return children;
}
