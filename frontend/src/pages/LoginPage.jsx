import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reduxAPIs/AuthSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./loginpage.css";
import { toast } from "react-toastify";

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  /*   useEffect(() => {
    prevPathname.current = location.pathname;
  }, [location]); */

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  console.info("formData :", formData);

  const [error, setError] = useState({});
  console.info("error :", error);

  const [isLogging, setIsLogging] = useState(false);
  console.info("islogging :", isLogging);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    /* username validation */
    if (e.target.name == "username") {
      if (e.target.value.length == 0)
        setError({ ...error, [e.target.name]: "Enter Username" });
      else if (/[^a-zA-Z0-9]/.test(e.target.value))
        setError({
          ...error,
          [e.target.name]: "No Special Character allowed",
        });
      else setError({ ...error, [e.target.name]: "" });
    }
    /* password validation */
    if (e.target.name == "password") {
      if (!/[a-z]/.test(e.target.value))
        setError({
          ...error,
          [e.target.name]: "Minimum 1 Small Case",
        });
      else if (!/[A-Z]/.test(e.target.value))
        setError({
          ...error,
          [e.target.name]: "Minimum 1 Upper Case",
        });
      else if (!/[0-9]/.test(e.target.value))
        setError({
          ...error,
          [e.target.name]: "Minimum 1 Numeric Value",
        });
      else if (!/[^a-zA-Z0-9]/.test(e.target.value))
        setError({
          ...error,
          [e.target.name]: "Minimum 1 Special Character",
        });
      /* else setError({ ...error, [e.target.name]: "" }); */ else if (
        e.target.value.length < 8 ||
        e.target.value.length >= 20
      )
        setError({
          ...error,
          [e.target.name]: "Minimum 8 Maximum 20 Characters",
        });
      else {
        setError({ ...error, [e.target.name]: "" });
      }
    }

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setIsLogging(true);

    if (!formData.username) setError({ ...error, username: "Enter Username" });
    else if (!formData.password)
      setError({ ...error, password: "Enter Password" });

    console.info("object values  :", Boolean(e.target.password.value));

    if (
      (Object.keys(error).length === 0 ||
        e.target.password.value.length >= 8) &&
      e.target.username.value.length > 0
    ) {
      try {
        await dispatch(login(formData)).unwrap();
        navigate("/homepage");
      } catch (error) {
        setIsLogging(false);
        console.warn("Login Error :", error);
      }
    } else {
      setIsLogging(false);
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className="login-page-form">
        <div className="login-page-layout">
          <h2>Welcome to Login Page</h2>
          <div className="login-item">
            <label htmlFor="username">Username :</label>
            <input
              type="text"
              onChange={handleChange}
              name="username"
              disabled={isLogging}
            />
            {error.username && <p>{error.username}</p>}
          </div>
          <div className="login-item">
            <label htmlFor="password">Password :</label>
            <input
              type="text"
              onChange={handleChange}
              name="password"
              disabled={isLogging}
            />
            {error.password && <p>{error.password}</p>}
          </div>
          <div>
            <Link to="/">
              <button>Go to SignUp</button>
            </Link>
            <button type="submit" disabled={isLogging}>
              {" "}
              {isLogging ? "Logging in" : "Login"}{" "}
            </button>
            
          </div>
        </div>
      </form>
    </>
  );
}
